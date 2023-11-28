const express = require("express");
const router = express.Router();
const parcoursController = require('../controllers/parcours.controller');
const parcoursMiddleware = require('../middlewares/parcours.middleware');

router.get("/home", (req, res) => {
    res.send("HOME");
});

router.post('/', parcoursMiddleware.validateParcoursInput, parcoursController.createParcours);
router.get('/', parcoursController.getAllParcours);
router.get('/:id', parcoursController.getParcoursById);
router.put('/:id', parcoursMiddleware.validateParcoursInput, parcoursController.updateParcours);
router.delete('/:id', parcoursController.deleteParcours);

module.exports = router;
