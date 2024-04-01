const relationService = require('../services/relation.service');


// --------------------------------------------------------------


exports.getAllAffectationsStands = async (req, res) => {
    try {
        const affectations = await relationService.getAllAffectationsStands();
        res.status(200).json(affectations);
    } catch (error) {
        res.status(500).send('Internal error');
    }
};

exports.getAffectationStandByIdStand = (req, res) => {
    const idStand = req.params.id;
    relationService.getAffectationStandByIdStand(idStand)
        .then((data) => {
            if (!data) {
                res.status(404).send("role not found");
            } else {
                res.status(200).json(data);
            }
        })
        .catch((error) => res.status(500).send("Internal error"));
};



exports.deleteAffectationStandByIdStand = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedAffectation = await relationService.deleteAffectationStandByIdStand(id);
        if (!deletedAffectation) {
            res.status(404).send("affectation not found");
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).send("Internal error");
    }
};

exports.addUtilisateurToStand = async (req, res) => {
    const { id_utilisateur, id_stand } = req.body;
    try {
        const affectation = await relationService.addUtilisateurToStand(id_utilisateur, id_stand);
        res.status(201).json(affectation);
    } catch (error) {
        res.status(500).send('Internal error');
    }
};


// --------------------------------------------------------------


exports.getAllVentes = async (req, res) => {
    try {
        const ventes = await relationService.getAllVentes();
        res.status(200).json(ventes);
    } catch (error) {
        res.status(500).send('Internal error');
    }
};

exports.getAllProduitsByStand = async (req, res) => {
    const { idStand } = req.params;
    try {
        const produits = await relationService.getAllProduitsByStand(idStand);
        res.status(200).json(produits);
    } catch (error) {
        res.status(500).send('Internal error');
    }
};


exports.addProduitToStand = async (req, res) => {
    const { id_stand, id_produit } = req.body;
    try {
        const vente = await relationService.addProduitToStand(id_stand, id_produit);
        res.status(201).json(vente);
    } catch (error) {
        res.status(500).send('Internal error');
    }
};

exports.deleteRelationProduitStand = async (req, res) => {
    const { idStand, idProduit } = req.params;
    try {
        const deletedRelation = await relationService.deleteRelationProduitStand(idStand, idProduit);

        if (!deletedRelation) {
            return res.status(404).send('Relation not found');
        }

        res.status(200).json(deletedRelation);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal error');
    }
};

exports.getProduitIdFromRelation = async (req, res) => {
    const { idStand, idProduit } = req.params;
    try {
        const produitId = await relationService.getProduitIdFromRelation(idStand, idProduit);

        if (!produitId) {
            return res.status(404).send('Product ID not found for the given relation');
        }

        res.status(200).json({ produitId });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal error');
    }
};

// --------------------------------------------------------------



exports.getAllAffectationsMontgolfieres = async (req, res) => {
    try {
        const affectations = await relationService.getAllAffectationsMontgolfieres();
        res.status(200).json(affectations);
    } catch (error) {
        res.status(500).send('Internal error');
    }
};




exports.addUtilisateurToMontgolfiere = async (req, res) => {
    const { id_utilisateur, id_montgolfiere } = req.body;
    try {
        const affectation = await relationService.addUtilisateurToMontgolfiere(id_utilisateur, id_montgolfiere);
        res.status(201).json(affectation);
    } catch (error) {
        res.status(500).send('Internal error');
    }
};


// --------------------------------------------------------------



exports.getAllAffectationsVols = async (req, res) => {
    try {
        const affectations = await relationService.getAllAffectationsVols();
        res.status(200).json(affectations);
    } catch (error) {
        res.status(500).send('Internal error');
    }
};


exports.addUtilisateurToVol = async (req, res) => {
    const { id_utilisateur, id_vol } = req.body;
    try {
        const affectation = await relationService.addUtilisateurToVol(id_utilisateur, id_vol);
        res.status(201).json(affectation);
    } catch (error) {
        res.status(500).send('Internal error');
    }
};


// --------------------------------------------------------------



exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await relationService.getAllReservations();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).send('Internal error');
    }
};



exports.reserveEmplacement = async (req, res) => {
    const { id_utilisateur, id_stand, id_emplacement, id_date_reservation } = req.body;
    try {
        const reservation = await relationService.reserveEmplacement(id_utilisateur, id_stand, id_emplacement, id_date_reservation);
        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).send('Internal error');
    }
};
