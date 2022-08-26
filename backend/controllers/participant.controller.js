import Participant from '../models/participant.model.js';


export default class ParticipantController {
    static register(req, res) {
        const participant = new Participant({
            firstName: req.body.firstName || '',
            lastName: req.body.lastName,
            dateOfBirth: req.body.dateOfBirth,
            email: req.body.email,
            position: req.body.position,
            description: req.body.description || '',
            notes: req.body.notes || ''
        });
        participant.register()
            .then(function (result) {
                res.send({
                    message: 'Registered 1 participant in the database ' +
                             `with ${result.affectedRows} rows affected`,
                    data: result.id
                });
            })
            .catch(function (error) {
                res.status(500).send({
                   message: error.message || 'Some unknown error occurred'
                });
            });
    }


    static findById(req, res) {
        Participant.findById(req.params.id)
            .then(function (result) {
                res.send({
                    message: `Found ${result.length} participant in the database`,
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
        Participant.findAll()
            .then(function (result) {
                res.send({
                   message: `Found ${result.length} participant(s) in the database`,
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
        if (req.body.firstName) {
            fields.firstName = req.body.firstName;
        }
        if (req.body.lastName) {
            fields.lastName = req.body.lastName;
        }
        if (req.body.dateOfBirth) {
            fields.dateOfBirth = req.body.dateOfBirth;
        }
        if (req.body.email) {
            fields.email = req.body.email;
        }
        if (req.body.position) {
            fields.position = req.body.position;
        }
        if (req.body.description) {
            fields.description = req.body.description;
        }
        if (req.body.notes) {
            fields.notes = req.body.notes;
        }

        Participant.updateById(req.params.id, fields)
            .then(function (result) {
                res.send({
                    message: 'Updated 1 participant in the database ' +
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
        Participant.deleteById(req.params.id)
            .then(function (result) {
                res.send({
                    message: 'Deleted 1 participant from the database ' +
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
