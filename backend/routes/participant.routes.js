import express from 'express';

import participantController from '../controllers/participant.controller.js';


const router = express.Router();
router.get('/', participantController.findAll);
router.post('/', participantController.register);
router.get('/:id', participantController.findById);
router.patch('/:id', participantController.updateById);
router.delete('/:id', participantController.deleteById);


export default router;
