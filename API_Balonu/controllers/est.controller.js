const estService = require('../services/estService');

exports.getEst = (req, res) => {
    estService.getSontCouleurs()
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).send("Internal error"));
};

exports.getEstForMontgolfiere = (req, res) => {
    const id_montgolfiere = req.params.id_montgolfiere;
    estService.getEstForMontgolfiere(id_montgolfiere)
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).send("Internal error"));
};

exports.getEstForCouleur = (req, res) => {
    const id_couleur = req.params.id_couleur;
    estService.getEstForCouleur(id_couleur)
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).send("Internal error"));
};

exports.getEstForMontgolfiereInCouleur = (req, res) => {
    const id_montgolfiere = req.params.id_montgolfiere;
    const id_couleur = req.params.id_couleur;
    estService.getEstForMontgolfiereInCouleur(id_montgolfiere, id_couleur)
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).send("Internal error"));
};

exports.createEst = async (req, res) => {
    const { id_montgolfiere, id_couleur } = req.body;
    try {
        const vente = await estService.createEst(id_montgolfiere, id_couleur);
        res.status(201).json(vente);
    } catch (error) {
        res.status(500).send("Internal error");
    }
};

exports.updateVente = async (req, res) => {
    const id_vente = req.params.id_vente;
    const { id_stand, id_produit, prix_produit } = req.body;
    try {
        const updatedVente = await venteService.updateVente(id_vente, id_stand, id_produit, prix_produit);
        res.status(200).json(updatedVente);
    } catch (error) {
        if (error === "Vente not found") {
            res.status(404).send("Vente not found");
        } else {
            res.status(500).send("Internal error");
        }
    }
};

exports.deleteVente = (req, res) => {
    const id_vente = req.params.id_vente;
    estService.deleteVente(id_vente)
        .then(() => res.status(204).send())
        .catch((error) => res.status(500).send(error));
};

exports.deleteVentesForStand = (req, res) => {
    const id_stand = req.params.id_stand;
    estService.deleteVentesForStand(id_stand)
        .then(() => res.status(204).send())
        .catch((error) => res.status(500).send(error));
};

// Supprimer toutes les ventes liées à un produit
exports.deleteVentesForProduit = (req, res) => {
    const id_produit = req.params.id_produit;
    estService.deleteVentesForProduit(id_produit)
        .then(() => res.status(204).send())
        .catch((error) => res.status(500).send(error));
};

// Supprimer toutes les ventes d'un produit dans un stand
exports.deleteVentesForProduitInStand = (req, res) => {
    const id_stand = req.params.id_stand;
    const id_produit = req.params.id_produit;
    estService.deleteVentesForProduitInStand(id_stand, id_produit)
        .then(() => res.status(204).send())
        .catch((error) => res.status(500).send(error));
};

exports.updateVentesForStand = async (req, res) => {
    const id_stand = req.params.id_stand;
    const prix_produit = req.body.prix_produit;
    const updatedVentes = await venteService.updateVentesForStand(id_stand, prix_produit);
    res.status(200).json(updatedVentes);
};

// Mettre à jour toutes les ventes liées à un produit
exports.updateVentesForProduit = async (req, res) => {
    const id_produit = req.params.id_produit;
    const prix_produit = req.body.prix_produit;
    const updatedVentes = await venteService.updateVentesForProduit(id_produit, prix_produit);
    res.status(200).json(updatedVentes);
};

// Mettre à jour toutes les ventes d'un produit dans un stand
exports.updateVentesForProduitInStand = async (req, res) => {
    const id_stand = req.params.id_stand;
    const id_produit = req.params.id_produit;
    const prix_produit = req.body.prix_produit;
    const updatedVentes = await venteService.updateVentesForProduitInStand(id_stand, id_produit, prix_produit);
    res.status(200).json(updatedVentes);
};

