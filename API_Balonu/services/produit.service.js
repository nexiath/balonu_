const pool = require('../config/db');

async function getAllProduits() {
    try {
        const { rows } = await pool.query("SELECT * FROM produit");
        return rows;
    } catch (error) {
        console.error("Error during getAllProduits", error);
        throw error;
    }
}

async function getProduitById(id) {
    try {
        const { rows } = await pool.query("SELECT * FROM produit WHERE id_produit = $1", [id]);
        return rows[0];
    } catch (error) {
        console.error("Error during getProduitById", error);
        throw error;
    }
}

async function createProduit(libelle_produit, stock_produit, prix_produit, description_produit, quantite_produit, id_categorie) {
    try {
        const { rows } = await pool.query(
            "INSERT INTO produit (libelle_produit, stock_produit, prix_produit, description_produit, quantite_produit, id_categorie) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_produit",
            [libelle_produit, stock_produit, prix_produit, description_produit, quantite_produit, id_categorie]
        );
        return await getAllProduits(rows[0].id_produit);
    } catch (error) {
        console.error("Error during createProduit", error);
        throw error;
    }
}

function deleteProduit(id_produit) {
    return pool.query("DELETE FROM produit WHERE id_produit = $1", [id_produit]);
}

async function updateProduit(id_produit, libelle_produit, stock_produit, prix_produit, description_produit, quantite_produit, id_categorie) {
    try {
        await pool.query(
            "UPDATE produit SET libelle_produit = $1, stock_produit = $2, prix_produit = $3, description_produit = $4, quantite_produit = $5, id_categorie = $6 WHERE id_produit = $7",
            [libelle_produit, stock_produit, prix_produit, description_produit, quantite_produit, id_categorie, id_produit]
        );
        return await getAllProduits(id_produit);
    } catch (error) {
        console.error("Error during updateProduit", error);
        throw error;
    }
}

module.exports = {
    getAllProduits,
    getProduitById,
    createProduit,
    deleteProduit,
    updateProduit,
};
