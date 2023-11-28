const express = require("express");
const router = express.Router();
const estController = require('../controllers/est.controller');
const estMiddleware = require('../middlewares/est.middleware');

router.get("/home", (req, res) => {
    res.send("HOME");
});


router.post("/",estMiddleware.validateEstInput,estController.createEst);
router.get("/", estController.getEst);
router.get("/montgolfieres/:id_montgolfiere", estController.getEstForMontgolfiere);
router.get("/couleurs/:id_couleur", estController.getEstForCouleur);
router.get("/:id_montgolfiere/:id_couleur", estController.getEstForMontgolfiereInCouleur);


module.exports = router;


