const express = require('express');
const planningController = require('../controllers/planning.controller');
const router = express.Router();

router.post('/', planningController.creerPlanning);
router.get('/week', planningController.getPlanningForWeek);
router.get('/:id', planningController.obtenirPlanning);
router.put('/:id', planningController.mettreAJourPlanning);
router.delete('/:id', planningController.supprimerPlanning)



module.exports = router;
