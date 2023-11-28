const express = require("express");
const router = express.Router();
const horaireVolController = require('../controllers/horaireVol.controller');
const horaireVolMiddleware = require('../middlewares/horaireVol.middleware');

router.get("/home", (req, res) => {
    res.send("HOME");
});

router.post('/', horaireVolMiddleware.validateHoraireVolInput, horaireVolController.createHoraireVol);
router.get('/', horaireVolController.getHorairesVol);
router.get('/:id', horaireVolController.getHoraireVolById);
router.put('/:id_horaire_vol', horaireVolMiddleware.validateHoraireVolInput, horaireVolController.updateHoraireVol);
router.delete('/:id', horaireVolController.deleteHoraireVol);

module.exports = router;
