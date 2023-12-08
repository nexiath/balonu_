const passesService = require('../services/passesService');

const getPasses = async (req, res) => {
    try {
        const passes = await passesService.getPasses();
        res.json(passes);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addPass = async (req, res) => {
    try {
        const pass = req.body;
        await passesService.addPass(pass);
        res.status(201).send('Pass added successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getPasses,
    addPass
};
