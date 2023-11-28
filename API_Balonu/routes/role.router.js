const express = require("express");
const router = express.Router();
const roleController = require('../controllers/role.controller');


router.get("/home", (req, res) => {
    res.send("HOME");
});


router.get('/', roleController.getRole);
router.get('/:id',roleController.getRoleById);

module.exports = router;
