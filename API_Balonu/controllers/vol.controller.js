const volService = require('../services/vol.service');

exports.createVol = async (req, res) => {
    const { prix_vol, libelle_vol, avis_vol, id_montgolfiere, id_parcours, id_planning } = req.body;
    try {
        const volId = await volService.createVol(prix_vol, libelle_vol, avis_vol, id_montgolfiere, id_parcours, id_planning);
        res.status(201).json({ id: volId, message: 'Vol créé avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création du vol' });
    }
};

exports.getAllVols = async (req, res) => {
    try {
        const vols = await volService.getAllVols();
        res.status(200).json(vols);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des vols' });
    }
};

exports.getVolById = async (req, res) => {
    const { id } = req.params;
    try {
        const vol = await volService.getVolById(id);
        if (vol) {
            res.status(200).json(vol);
        } else {
            res.status(404).json({ message: 'Vol non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du vol' });
    }
};

exports.updateVol = async (req, res) => {
    const { id } = req.params;
    const { prix_vol, libelle_vol, avis_vol, id_montgolfiere, id_parcours, id_planning } = req.body;
    try {
        const updatedVol = await volService.updateVol(id, prix_vol, libelle_vol, avis_vol, id_montgolfiere, id_parcours, id_planning);
        res.status(200).json(updatedVol);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du vol' });
    }
};

exports.deleteVol = async (req, res) => {
    const { id } = req.params;
    try {
        await volService.deleteVol(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du vol' });
    }
};
