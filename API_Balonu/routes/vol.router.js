const express = require("express");
const router = express.Router();
const volController = require('../controllers/vol.controller');
const volMiddleware = require('../middlewares/vol.middleware');

router.get("/home", (req, res) => {
    res.send("HOME");
});

router.post('/', volMiddleware.validateVolInput, volController.createVol);
router.get('/', volController.getAllVols);
router.get('/:id', volController.getVolById);
router.put('/:id', volMiddleware.validateVolInput, volController.updateVol);
router.delete('/:id', volController.deleteVol);

module.exports = router;
