import express from 'express';
import moment from 'moment';
import connection from '../database.js';


const router = express.Router();

router.get('/', (req, res) => {
    res.send('GET request for all users');
});

router.get('/:userId', (req, res) => {
    const query = `SELECT *
                   FROM users
                   WHERE name = "${req.query.name}"`;
    connection.query(query, (error, results) => {
        if (error) {
            throw error;
        }
        res.send({
            name: results[0].name,
            email: results[0].email,
            birth: moment(results[0].birth).utc().format('YYYY-MM-DD')
        });
    });
    //res.send(`GET request for user ${userId}`);
});

router.post('/:userId', (req, res) => {
    const { name, email, birth } = req.body;
    let status = 'OK';
    let message = '';
    const query = `INSERT INTO users (name, email, birth)
                   VALUES ("${name}", "${email}", DATE "${birth}")`;
    connection.query(query, (error, results) => {
        if (error) {
            status = 'ERROR';
            message = error.message;
        }
    });
    res.send({
        status: status,
        message: message
    });
});

router.patch('/:userId', (req, res) => {
    const { userId } = req.params;
    res.send(`PATCH request for user ${userId}`);
});

router.delete('/:userId', (req, res) => {
   const { userId } = req.params;
   res.send(`DELETE request for user ${userId}`);
});


export default router;
