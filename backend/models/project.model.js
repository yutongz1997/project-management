import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';

import pool from '../database.js';


export default class Project {
    constructor(project) {
        this.id = uuidv4();
        this.title = project.title;
        this.participants = project.participants;
        this.description = project.description;
        this.year = project.year;
        this.notes = project.notes;
        this.lastUpdateTime = DateTime.utc()
            .toFormat('yyyy-MM-dd HH:mm:ss')
    }


    async create() {
        let connection;
        try {
            connection = await pool.getConnection();
            await connection.beginTransaction();

            const sqlProject = 'INSERT INTO `projects` \
                                (`id`, `title`, `description`, `year`, `notes`, \
                                 `lastUpdateTime`) \
                                VALUES (?, ?, ?, ?, ?, ?)';
            let [result, ] = await connection.execute(sqlProject,
                [this.id, this.title, this.description, this.year,
                    this.notes, this.lastUpdateTime]);
            const affectedRowsProject = result.affectedRows;

            let affectedRowsLinks = 0;
            for (const participantId of this.participants) {
                const sqlLink = 'INSERT INTO `lookup_project_participants` \
                                 (`id_project`, `id_participant`) \
                                 VALUES (?, ?)';
                [result, ] = await connection.execute(sqlLink,
                    [this.id, participantId]);
                affectedRowsLinks += result.affectedRows;
            }

            await connection.commit();
            await connection.release();
            return new Promise((resolve, _) => {
                resolve({
                    affectedRows: affectedRowsProject + affectedRowsLinks,
                    id: this.id
                });
            });
        } catch (error) {
            if (connection) {
                await connection.rollback();
                await connection.release();
            }
            return new Promise((_, reject) => {
                reject(error);
            });
        }
    }


    static async findById(id) {
        let connection;
        try {
            connection = await pool.getConnection();
            await connection.beginTransaction();

            const sqlProject = 'SELECT * FROM `projects` \
                                WHERE `id` = ?';
            let [results, ] = await connection.execute(sqlProject, [id]);
            if (results.length === 0) {
                await connection.rollback();
                await connection.release();
                return new Promise((_, reject) => {
                    reject(new Error(`No project found in the database with ID ${id}`));
                });
            }

            const projectData = results[0];
            const sqlParticipants = 'SELECT p.`id`, p.`firstName`, p.`lastName` \
                                     FROM `participants` p \
                                     INNER JOIN `lookup_project_participants` lpp \
                                        ON p.`id` = lpp.`id_participant` \
                                     WHERE `id_project` = ?';
            [results, ] = await connection.execute(sqlParticipants, [projectData.id]);
            if (results.length === 0) {
                await connection.rollback();
                await connection.release();
                return new Promise((_, reject) => {
                    reject(new Error(`No participant found for the project with ID ${id}`));
                });
            }
            return new Promise((resolve, _) => {
                const data = {
                    ...projectData,
                    participants: results
                };
                resolve({
                    length: 1,
                    data: [data]
                });
            });
        } catch (error) {
            return new Promise((_, reject) => {
                reject(error);
            });
        }
    }


    static async findAll() {
        let connection;
        try {
            connection = await pool.getConnection();
            await connection.beginTransaction();

            const sqlProject = 'SELECT * FROM `projects`';
            let [results, ] = await connection.execute(sqlProject);

            const projects = results;
            if (projects.length > 0) {
                const sqlParticipants = 'SELECT lpp.`id_project` AS `idProject`, p.`id` AS `idParticipant`, \
                                            p.`firstName`, p.`lastName` \
                                         FROM `lookup_project_participants` lpp \
                                         INNER JOIN `participants` p \
                                            ON lpp.`id_participant` = p.`id`';
                [results, ] = await connection.execute(sqlParticipants);
                if (results.length === 0) {
                    return new Promise((_, reject) => {
                        reject(new Error('No participant found when some project exists'));
                    });
                }

                for (const result of results) {
                    const project = projects.find(project => project.id === result.idProject);
                    if (!project.participants) {
                        project.participants = [];
                    }
                    project.participants.push({
                        id: result.idParticipant,
                        firstName: result.firstName,
                        lastName: result.lastName
                    });
                }
            }

            return new Promise((resolve, _) => {
                resolve({
                    length: projects.length,
                    data: projects
                });
            });
        } catch (error) {
            if (connection) {
                await connection.rollback();
                await connection.release();
            }
            return new Promise((_, reject) => {
                reject(error);
            });
        }
    }


    static async updateById(id, fields) {
        let connection;
        try {
            const searchResult = await this.findById(id);
            const currParticipants = searchResult.data[0].participants
                .map(participant => participant.id);
            const newParticipants = fields.participants ?
                fields.participants : currParticipants;
            const project = {
                ...searchResult.data[0],
                ...fields,
                participants: newParticipants,
                lastUpdateTime: DateTime.utc()
                    .toFormat('yyyy-MM-dd HH:mm:ss')
            };

            connection = await pool.getConnection();
            await connection.beginTransaction();

            const sqlProject = 'UPDATE `projects` \
                                SET `title` = ?, `description` = ?, `year` = ?, \
                                    `notes` = ?, `lastUpdateTime` = ? \
                                WHERE `id` = ?';
            let [result, ] = await connection.execute(sqlProject,
                [project.title, project.description, project.year,
                    project.notes, project.lastUpdateTime, id]);
            if (result.affectedRows === 0) {
                await connection.rollback();
                await connection.release();
                return new Promise((_, reject) => {
                    reject(new Error(`Failed to update the project with ID ${id}`));
                });
            }
            const affectedRowsProject = result.affectedRows;

            let affectedRowsLinks = 0;
            if (fields.participants) {
                const linksToDelete = currParticipants
                    .filter(participant => !newParticipants.includes(participant));
                if (linksToDelete.length > 0) {
                    const placeholders = Array(linksToDelete.length).fill('?').join();
                    const sqlDelete = `DELETE FROM \`lookup_project_participants\` \
                                       WHERE \`id_project\` = '${id}' \
                                         AND \`id_participant\` IN (${placeholders})`;
                    [result, ] = await connection.execute(sqlDelete, linksToDelete);
                    if (result.affectedRows === 0) {
                        await connection.rollback();
                        await connection.release();
                        return new Promise((_, reject) => {
                            reject(new Error('Failed to delete previous participant(s) ' +
                                `of the project with ID ${id}`));
                        });
                    }
                    affectedRowsLinks += result.affectedRows;
                }

                const linksToAdd = newParticipants
                    .filter(participant => !currParticipants.includes(participant));
                if (linksToAdd.length > 0) {
                    const sqlAdd = 'INSERT INTO `lookup_project_participants` \
                                    (`id_project`, `id_participant`) \
                                    VALUES (?, ?)';
                    for (const link of linksToAdd) {
                        [result, ] = await connection.execute(sqlAdd,
                            [id, link]);
                        affectedRowsLinks += result.affectedRows;
                    }
                }
            }

            await connection.commit();
            await connection.release();
            return new Promise((resolve, _) => {
                resolve({
                    affectedRows: affectedRowsProject + affectedRowsLinks
                });
            });
        } catch (error) {
            if (connection) {
                await connection.rollback();
                await connection.release();
            }
            return new Promise((_, reject) => {
                reject(error);
            });
        }
    }


    static async deleteById(id) {
        let connection;
        try {
            connection = await pool.getConnection();
            await connection.beginTransaction();

            const sqlLinks = 'DELETE FROM `lookup_project_participants` \
                              WHERE id_project = ?';
            let [result, ] = await connection.execute(sqlLinks, [id]);
            if (result.affectedRows === 0) {
                return new Promise((_, reject) => {
                    reject(new Error(`Failed to delete the project with ID ${id}`));
                });
            }
            const affectedRowsLinks = result.affectedRows;

            const sqlProject = 'DELETE FROM `projects` \
                                WHERE `id` = ?';
            [result, ] = await connection.execute(sqlProject, [id]);
            const affectedRowsProject = result.affectedRows;

            await connection.commit();
            await connection.release();
            return new Promise((resolve, _) => {
                resolve({
                    affectedRows: affectedRowsProject + affectedRowsLinks
                });
            });
        } catch (error) {
            if (connection) {
                await connection.rollback();
                await connection.release();
            }
            return new Promise((_, reject) => {
                reject(error);
            });
        }
    }
};
