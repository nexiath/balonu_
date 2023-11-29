const standService = require("../services/stand.service");

exports.createStand = async (req, res) => {
    const userId = req.userId;
    if (!userId) {
        res.status(400).send("Missing user ID in request");
        return;
    }
    const { libelle_stand, description_stand, image_stand, id_emplacement, id_categorie_stand } = req.body;
    
    try {
        const stand = await standService.createStand(
            userId, libelle_stand, description_stand, image_stand, id_emplacement, id_categorie_stand);
        res.status(201).json(stand);
    } catch (error) {
        console.error('Error creating stand:', error);
        res.status(500).send("Internal error");
    }
};


exports.getAllStands = async (req, res) => {
    try {
        const stands = await standService.getAllStands();
        res.status(200).json(stands);
    } catch (error) {
        res.status(500).send("Internal error");
    }
};

exports.getStandById = async (req, res) => {
    const id = req.params.id;
    try {
        const stand = await standService.getStandById(id);
        if (!stand) {
            res.status(404).send("Stand not found");
        } else {
            res.status(200).json(stand);
        }
    } catch (error) {
        res.status(500).send("Internal error");
    }
};

exports.updateStand = async (req, res) => {
    const id = req.params.id;
    const { libelle_stand, description_stand, image_stand, id_emplacement, id_categorie_stand } = req.body;
    try {
        const updatedStand = await standService.updateStand(id, libelle_stand, description_stand, image_stand, id_emplacement, id_categorie_stand);
        if (!updatedStand) {
            res.status(404).send("Stand not found");
        } else {
            res.status(200).json(updatedStand);
        }
    } catch (error) {
        res.status(500).send("Internal error");
    }
};

exports.deleteStand = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedStand = await standService.deleteStand(id);
        if (!deletedStand) {
            res.status(404).send("Stand not found");
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).send("Internal error");
    }
};

exports.getStandsByIdEmplacement = async (req, res) => {
    const id_emplacement = req.params.id_emplacement;
    try {
        const stands = await standService.getStandsByIdEmplacement(id_emplacement);
        if (!stands) {
            res.status(404).send("Stand not found");
        } else {
            res.status(200).json(stands);
        }
    } catch (error) {
        res.status(500).send("Internal error");
    }
};

exports.getStandsByCategorie = async (req, res) => {
    const id_categorie_stand = req.params.id_categorie_stand;
    try {
        const stands = await standService.getStandsByCategorie(id_categorie_stand);
        if (!stands) {
            res.status(404).send("Stand not found");
        } else {
            res.status(200).json(stands);
        }
    } catch (error) {
        res.status(500).send("Internal error");
    }
};

exports.getStandsByIdUtilisateur = async (req, res) => {
    const id = req.params.id;
    try {
        const userStands = await standService.getStandsByIdUtilisateur(id);
        if (!userStands) {
            res.status(404).send("User stands not found");
        } else {
            res.status(200).json(userStands);
        }
    } catch (error) {
        res.status(500).send("Internal error");
    }
};
