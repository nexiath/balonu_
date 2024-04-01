const produitService = require("../services/produit.service");

exports.createProduit = async (req, res) => {
    const { libelle_produit, stock_produit, prix_produit, description_produit, quantite_produit, id_categorie, image_produit } = req.body;
    try {
        const produit = await produitService.createProduit(libelle_produit, stock_produit, prix_produit, description_produit, quantite_produit, id_categorie, image_produit);
        res.status(201).json(produit);
    } catch (error) {
        console.error("Error in createProduit:", error);
        res.status(500).send("Internal error");
    }
};

exports.getAllProduits = async (req, res) => {
    try {
        const produits = await produitService.getAllProduits();
        res.status(200).json(produits);
    } catch (error) {
        res.status(500).send("Internal error");
    }
};

exports.getProduitById = async (req, res) => {
    const id = req.params.id;
    try {
        const produit = await produitService.getProduitById(id);
        if (!produit) {
            res.status(404).send("Produit not found");
        } else {
            res.status(200).json(produit);
        }
    } catch (error) {
        res.status(500).send("Internal error");
    }
};

exports.updateProduit = async (req, res) => {
    const id = req.params.id;
    const { libelle_produit, stock_produit, prix_produit, description_produit, quantite_produit, id_categorie, image_produit } = req.body;
    try {
        const updatedProduit = await produitService.updateProduit(id, libelle_produit, stock_produit, prix_produit, description_produit, quantite_produit, id_categorie, image_produit);
        if (!updatedProduit) {
            res.status(404).send("Produit not found");
        } else {
            res.status(200).json(updatedProduit);
        }
    } catch (error) {
        console.error("Error in updateProduit:", error);
        res.status(500).send("Internal error");
    }
};
exports.updateProductStock = async (req, res) => {
    const id = req.params.id;
    const { stock_produit } = req.body;

    try {
        await produitService.updateStock(id, stock_produit);
        res.status(200).json({ message: 'Stock updated successfully.' });
    } catch (error) {
        console.error("Error in updateProductStock:", error);
        res.status(500).send("Internal error");
    }
};

exports.deleteProduit = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedProduit = await produitService.deleteProduit(id);
        if (!deletedProduit) {
            res.status(404).send("Produit not found");
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).send("Internal error");
    }
};
