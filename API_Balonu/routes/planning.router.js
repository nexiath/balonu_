const express = require("express");
const router = express.Router();
const planningController = require('../controllers/planning.controller');
const planningMiddleware = require('../middlewares/planning.middleware');

router.get("/home", (req, res) => {
    res.send("HOME");
});


router.post('/', planningMiddleware.validatePlanningInput, planningController.createPlanning);
router.get('/', planningController.getAllPlannings);
router.get('/:id',planningController.getPlanningById);
router.put('/:id',planningMiddleware.validatePlanningInput,planningController.updatePlanning);
router.delete('/:id',planningController.deletePlanning);

module.exports = router;
