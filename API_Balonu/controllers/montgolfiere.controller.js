const montgolfiereService = require('../services/montgolfiereService');
const usersService = require('../services/utilisateur.service');


exports.createMontgolfiere = async (req, res) => {
    const userId = req.userId;
    const { nombre_place, libelle_montgolfiere, photo_montgolfiere, montgolfiere_est_active } = req.body;

    try {
        const montgolfiere = await montgolfiereService.createMontgolfiere({
          userId,
          nombre_place,
          libelle_montgolfiere,
          photo_montgolfiere,
          montgolfiere_est_active
        });
        res.status(201).json(montgolfiere);
    } catch (error) {
        console.error('Error during createMontgolfiere', error);
        res.status(500).send('Internal error');
    }
};
exports.getMontgolfieres = async (req, res) => {
    try {
        const montgolfieres = await montgolfiereService.getMontgolfieres();
        res.status(200).json(montgolfieres);
    } catch (error) {
        console.error('Error during getMontgolfieres', error);
        res.status(500).send('Internal error');
    }
};

exports.getMontgolfieresByUtilisateur = async (req, res) => {
    const userId = req.params.id_utilisateur;

    try {
        // Vérification pour s'assurer que l'utilisateur existe
        if (!await usersService.checkUserExists(userId)) {
            return res.status(404).send('Utilisateur non trouvé');
        }

        const montgolfieres = await montgolfiereService.getMontgolfieresByUtilisateur(userId);
        if (!montgolfieres || montgolfieres.length === 0) {
            res.status(404).send('Aucune montgolfière trouvée pour cet utilisateur');
        } else {
            res.status(200).json(montgolfieres);
        }
    } catch (error) {
        console.error('Error during getMontgolfieresByUtilisateur', error);
        res.status(500).send('Internal server error');
    }
};


exports.getMontgolfiereById = async (req, res) => {
    const { id } = req.params;

    try {
        const montgolfiere = await montgolfiereService.getMontgolfiereById(id);
        if (!montgolfiere) {
            res.status(404).send('Montgolfiere not found');
        } else {
            res.status(200).json(montgolfiere);
        }
    } catch (error) {
        console.error('Error during getMontgolfiereById', error);
        res.status(500).send('Internal error');
    }
};

exports.updateMontgolfiere = async (req, res) => {
    const { id } = req.params; // ID of the montgolfiere to update
    const montgolfiereData = req.body; // Data to update the montgolfiere with

    try {
        // Assuming the updateMontgolfiere function in montgolfiereService is correctly implemented
        const montgolfiere = await montgolfiereService.updateMontgolfiere(id, montgolfiereData);
        if (!montgolfiere) {
            res.status(404).send('Montgolfiere not found');
        } else {
            res.status(200).json(montgolfiere);
        }
    } catch (error) {
        if (error.message.includes("n'est pas autorisé")) {
            res.status(403).send("Access Denied: You do not have permission to modify this montgolfiere.");
        } else {
            console.error('Error during updateMontgolfiere', error);
            res.status(500).send('Internal error');
        }
    }
};

exports.deleteMontgolfiere = async (req, res) => {
    const { id } = req.params;

    try {
        const success = await montgolfiereService.deleteMontgolfiere(id);
        if (!success) {
            res.status(404).send('Montgolfiere not found');
        } else {
            res.status(200).json({ message: 'Montgolfiere deleted successfully' });
        }
    } catch (error) {
        if (error.message.includes("n'est pas autorisé")) {
            res.status(403).send("Access Denied: You do not have permission to delete this montgolfiere.");
        } else {
            console.error('Error during deleteMontgolfiere', error);
            res.status(500).send('Internal server error');
        }
    }
};
