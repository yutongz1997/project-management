const express = require('express');

const router = express.Router();


router.get('/', (req, res) => {
    res.send('GET request for all projects');
});

router.get('/:projectId', (req, res) => {
    const { projectId } = req.params;
    res.send(`GET request for project ${projectId}`);
});

router.post('/:projectId', (req, res) => {
   const { projectId } = req.params;
   res.send(`POST request for project ${projectId}`);
});

router.patch('/:projectId', (req, res) => {
   const { projectId } = req.params;
   res.send(`PATCH request for project ${projectId}`);
});

router.delete('/:projectId', (req, res) => {
    const { projectId } = req.params;
    res.send(`DELETE request for project ${projectId}`);
});

module.exports = router;
