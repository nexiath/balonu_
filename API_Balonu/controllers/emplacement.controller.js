const emplacementService= require("../services/emplacement.service");

exports.createEmplacement = async (req, res) => {
    const {libelle_emplacement,capacite_emplacement,caracteristique_emplacement,point_eau_nombre,prise_nombre} = req.body;
    try {
        const emplacement = await emplacementService.createEmplacement(libelle_emplacement, capacite_emplacement, caracteristique_emplacement, point_eau_nombre, prise_nombre);
        res.status(201).json({id_emplacement: emplacement, message: 'Emplacement créé avec succès'});
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de l emplacement' });
    }
};

exports.getAllEmplacements = async (req, res) => {
    try {
        const emplacements = await emplacementService.getAllEmplacements();
        res.status(200).json(emplacements);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des emplacements' });
    }
};


exports.getEmplacementById = async (req, res) => {
    const id = req.params.id;
    try {
        const emplacement = await emplacementService.getEmplacementById(id);
        if (emplacement) {
            res.status(200).json(emplacement);
        } else {
            res.status(404).json({ message: 'Emplacement non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de l emplacement' });
    }
};


exports.updateEmplacement = async (req, res) => {
    const id = req.params.id;
    const { libelle_emplacement, capacite_emplacement, caracteristique_emplacement, point_eau_nombre, prise_nombre } = req.body;
    try {
        const updatedEmplacement = await emplacementService.updateEmplacement(id, libelle_emplacement, capacite_emplacement, caracteristique_emplacement, point_eau_nombre, prise_nombre);
        res.status(200).json(updatedEmplacement);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l emplacement' });
    }
};

exports.deleteEmplacement = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedEmplacement = await emplacementService.deleteEmplacement(id);
        if (!deletedEmplacement) {
            res.status(404).send("Emplacement non trouvé");
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).send('Erreur lors de la suppression de l emplacement');
    }
};
