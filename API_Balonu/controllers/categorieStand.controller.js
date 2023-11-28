const standService = require("../services/categorieStand.service");

exports.createCategorieStand = async (req, res) => {
    const { libelle_categorie_stand } = req.body;
    try {
        const stand = await standService.createCategorieStand(libelle_categorie_stand);
        res.status(201).json(stand);
    } catch (error) {
        res.status(500).send("Internal error");
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const stands = await standService.getAllCategories();
        res.status(200).json(stands);
    } catch (error) {
        res.status(500).send("Internal error");
    }
};

exports.getCategorieById = async (req, res) => {
    const id_categorie_stand = req.params.id_categorie_stand;
    try {
        const stand = await standService.getCategorieById(id_categorie_stand);
        if (!stand) {
            res.status(404).send("Stand not found");
        } else {
            res.status(200).json(stand);
        }
    } catch (error) {
        res.status(500).send("Internal error");
    }
};

exports.updateCategorieStand = async (req, res) => {
    const id_categorie_stand = req.params.id_categorie_stand;
    const { libelle_categorie_stand} = req.body;
    try {
        const updatedStand = await standService.updateCategorieStand(id_categorie_stand, libelle_categorie_stand);
        if (!updatedStand) {
            res.status(404).send("Stand not found");
        } else {
            res.status(200).json(updatedStand);
        }
    } catch (error) {
        res.status(500).send("Internal error");
    }
};

exports.deleteCategorieStand = async (req, res) => {
    const id_categorie_stand = req.params.id_categorie_stand;
    try {
        const deletedStand = await standService.deleteCategorieStand(id_categorie_stand);
        if (!deletedStand) {
            res.status(404).send("Stand not found");
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).send("Internal error");
    }
};
