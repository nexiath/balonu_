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
async function createProduit(libelle_produit, stock_produit, prix_produit, description_produit, quantite_produit, id_categorie, image_produit) {
    try {
        const { rows } = await pool.query(
            "INSERT INTO produit (libelle_produit, stock_produit, prix_produit, description_produit, quantite_produit, id_categorie, image_produit) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_produit",
            [libelle_produit, stock_produit, prix_produit, description_produit, quantite_produit, id_categorie, Buffer.from(image_produit, 'utf-8')]
        );
        return rows[0].id_produit;
    } catch (error) {
        console.error("Error during createProduit", error);
        throw error;
    }
}

async function updateStock(id_produit, newStock) {
    try {
        await pool.query(
            "UPDATE produit SET stock_produit = $1 WHERE id_produit = $2",
            [newStock, id_produit]
        );
    } catch (error) {
        console.error("Error during updateStock:", error);
        throw error;
    }
}
async function updateProduit(id_produit, libelle_produit, stock_produit, prix_produit, description_produit, quantite_produit, id_categorie, image_produit) {
    try {
        await pool.query(
            "UPDATE produit SET libelle_produit = $1, stock_produit = $2, prix_produit = $3, description_produit = $4, quantite_produit = $5, id_categorie = $6, image_produit = $7 WHERE id_produit = $8",
            [libelle_produit, stock_produit, prix_produit, description_produit, quantite_produit, id_categorie, image_produit, id_produit]
        );
        return await getAllProduits(id_produit);
    } catch (error) {
        console.error("Error during updateProduit", error);
        throw error;
    }
}
function deleteProduit(id_produit) {
    return pool.query("DELETE FROM produit WHERE id_produit = $1", [id_produit]);
}


module.exports = {
    getAllProduits,
    getProduitById,
    createProduit,
    deleteProduit,
    updateProduit,
    updateStock,
};
