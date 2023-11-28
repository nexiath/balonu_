const express = require("express");
const router = express.Router();
const emplacementController = require('../controllers/emplacement.controller');
const emplacementMiddleware = require('../middlewares/emplacement.middleware');

router.get("/home", (req, res) => {
    res.send("HOME");
});

router.post('/', emplacementMiddleware.validateEmplacementInput, emplacementController.createEmplacement);
router.get('/', emplacementController.getAllEmplacements);
router.get('/:id', emplacementController.getEmplacementById);
router.put('/:id', emplacementMiddleware.validateEmplacementInput, emplacementController.updateEmplacement);
router.delete('/:id', emplacementController.deleteEmplacement);


module.exports = router;
