const express = require('express');
const router = express.Router();
const passesController = require('../controllers/passesController');

router.get('/', passesController.getPasses);
router.post('/', passesController.addPass);

module.exports = router;