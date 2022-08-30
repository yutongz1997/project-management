import Project from '../models/project.model.js';


export default class ProjectController {
    static create(req, res) {
        const project = new Project({
            title: req.body.title,
            participants: req.body.participants,
            description: req.body.description || '',
            year: req.body.year,
            notes: req.body.notes || ''
        });
        project.create()
            .then(function (result) {
                res.send({
                    message: 'Created 1 project in the database ' +
                             `with ${result.affectedRows} rows affected`,
                    id: result.id
                });
            })
            .catch(function (error) {
                res.status(500).send({
                    message: error.message || 'Some unknown error occurred'
                });
            });
    }


    static findById(req, res) {
        Project.findById(req.params.id)
            .then(function (result) {
                res.send({
                    message: `Found ${result.length} project in the database`,
                    data: result.data
                });
            })
            .catch(function (error) {
                res.status(500).send({
                    message: error.message || 'Some unknown error occurred'
                });
            });
    }


    static findAll(req, res) {
        Project.findAll()
            .then(function (result) {
                res.send({
                    message: `Found ${result.length} project(s) in the database`,
                    data: result.data
                });
            })
            .catch(function (error) {
                res.status(500).send({
                    message: error.message || 'Some unknown error occurred'
                });
            });
    }


    static updateById(req, res) {
        let fields = {};
        if (req.body.title) {
            fields.title = req.body.title;
        }
        if (req.body.participants) {
            fields.participants = req.body.participants;
        }
        if (req.body.description) {
            fields.description = req.body.description;
        }
        if (req.body.year) {
            fields.year = req.body.year;
        }
        if (req.body.notes) {
            fields.notes = req.body.notes;
        }

        Project.updateById(req.params.id, fields)
            .then(function (result) {
                res.send({
                    message: 'Updated 1 project in the database ' +
                             `with ${result.affectedRows} rows affected`
                });
            })
            .catch(function (error) {
                res.status(500).send({
                    message: error.message || 'Some unknown error occurred'
                });
            });
    }


    static deleteById(req, res) {
        Project.deleteById(req.params.id)
            .then(function (result) {
                res.send({
                    message: 'Deleted 1 project from the database ' +
                             `with ${result.affectedRows} rows affected`
                });
            })
            .catch(function (error) {
                res.status(500).send({
                    message: error.message || 'Some unknown error occurred'
                });
            });
    }
};
