import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';
import pool from '../database.js';


export default class Participant {
    constructor(participant) {
        this.id = uuidv4();
        this.firstName = participant.firstName;
        this.lastName = participant.lastName;
        this.dateOfBirth = DateTime.fromISO(participant.dateOfBirth)
            .toUTC().toFormat('yyyy-MM-dd');
        this.email = participant.email;
        this.position = participant.position;
        this.description = participant.description;
        this.notes = participant.notes;
        this.joinDate = DateTime.utc()
            .toFormat('yyyy-MM-dd');
        this.lastUpdateTime = DateTime.utc()
            .toFormat('yyyy-MM-dd HH:mm:ss');
    }


    async register() {
        const sql = 'INSERT INTO `participants` \
                     (`id`, `firstName`, `lastName`, `dateOfBirth`, `email`, \
                      `position`, `description`, `notes`, `joinDate`, \
                      `lastUpdateTime`) \
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        try {
            const [result, ] = await pool.execute(sql,
                [this.id, this.firstName, this.lastName, this.dateOfBirth,
                    this.email, this.position, this.description, this.notes,
                    this.joinDate, this.lastUpdateTime]);
            return new Promise(function (resolve, _) {
                resolve({
                    affectedRows: result.affectedRows,
                    id: this.id
                });
            });
        } catch (error) {
            return new Promise(function (_, reject) {
                reject(error);
            });
        }
    }


    static async findById(id) {
        const sql = 'SELECT * FROM `participants` \
                     WHERE `id` = ?';
        try {
            const [results, ] = await pool.execute(sql, [id]);
            if (results.length === 0) {
                return new Promise(function (_, reject) {
                    reject(new Error(`No participant found in the database with ID ${id}.`));
                });
            } else {
                return new Promise(function (resolve, _) {
                    resolve({
                        length: results.length,
                        data: results
                    });
                });
            }
        } catch (error) {
            return new Promise(function (_, reject) {
                reject(error);
            });
        }
    }


    static async findAll() {
        const sql = 'SELECT * FROM `participants`';
        try {
            const [results, ] = await pool.execute(sql);
            return new Promise(function (resolve, _) {
                resolve({
                    length: results.length,
                    data: results
                });
            });
        } catch (error) {
            return new Promise(function (_, reject) {
                reject(error);
            });
        }
    }


    static async updateById(id, fields) {
        try {
            const searchResult = await this.findById(id);
            const participant = {
                ...searchResult.data[0],
                ...fields,
                lastUpdateTime: DateTime.utc().toISO()
            };

            const sql = 'UPDATE `participants` \
                         SET `firstName` = ?, `lastName` = ?, `dateOfBirth` = ?, \
                             `email` = ?, `position` = ?, `description` = ?, \
                             `notes` = ?, `lastUpdateTime` = ? \
                         WHERE `id` = ?';
            const [result, ] = await pool.execute(sql,
                [participant.firstName, participant.lastName, participant.dateOfBirth,
                    participant.email, participant.position, participant.description,
                    participant.notes, participant.lastUpdateTime, id]);
            if (result.affectedRows === 0) {
                return new Promise(function (_, reject) {
                    reject(new Error(`Failed to update the participant with ID ${id}`));
                });
            }
            return new Promise(function (resolve, _) {
                resolve({
                    affectedRows: result.affectedRows
                });
            });
        } catch (error) {
            return new Promise(function (_, reject) {
                reject(error);
            });
        }
    }


    static async deleteById(id) {
        const sql = 'DELETE FROM `participants` \
                     WHERE `id` = ?';
        try {
            const [result, ] = await pool.execute(sql, id);
            if (result.affectedRows === 0) {
                return new Promise(function (_, reject) {
                    reject(new Error(`Failed to delete the participant with ID ${id}`));
                });
            } else {
                return new Promise(function (resolve, _) {
                    resolve({
                        affectedRows: result.affectedRows
                    });
                });
            }
        } catch (error) {
            return new Promise(function (_, reject) {
                reject(error);
            });
        }
    }
};
