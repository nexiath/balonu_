const express = require('express');
const router = express.Router();
const relationController = require('../controllers/relation.controller');
const relationMiddleware = require('../middlewares/relation.middleware');

router.post('/affectationsStand', relationMiddleware.validateAffectationStandInput, relationController.addUtilisateurToStand);
router.get('/affectationsStand', relationController.getAllAffectationsStands);
router.get('/affectationsStand/:id', relationController.getAffectationStandByIdStand);


router.post('/ventes', relationMiddleware.validateVenteInput, relationController.addProduitToStand);
router.get('/ventes', relationController.getAllVentes);
router.get('/produitsByStand/:idStand', relationController.getAllProduitsByStand);

router.post('/affectationsMontgolfiere', relationMiddleware.validateAffectationMontgolfiereInput, relationController.addUtilisateurToMontgolfiere);
router.get('/affectationsMontgolfiere', relationController.getAllAffectationsMontgolfieres);

router.post('/affectationsVol', relationMiddleware.validateAffectationVolInput, relationController.addUtilisateurToVol);
router.get('/affectationsVol', relationController.getAllAffectationsVols);

router.post('/reservations', relationMiddleware.validateReservationEmplacementInput, relationController.reserveEmplacement);
router.get('/reservations', relationController.getAllReservations);

module.exports = router;
