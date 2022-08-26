import express from 'express';

import ProjectController from '../controllers/project.controller.js';


const router = express.Router();
router.get('/', ProjectController.findAll);
router.post('/', ProjectController.create);
router.get('/:id', ProjectController.findById);
router.patch('/:id', ProjectController.updateById);
router.delete('/:id', ProjectController.deleteById);


export default router;
