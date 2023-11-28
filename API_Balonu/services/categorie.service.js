const pool = require('../config/db');

async function getAllCategories() {
    try {
        const { rows } = await pool.query("SELECT * FROM categorie");
        return rows;
    } catch (error) {
        console.error("Error during getAllCategories", error);
        throw error;
    }
}

async function getCategorieById(id) {
    try {
        const { rows } = await pool.query("SELECT * FROM categorie WHERE id_categorie = $1", [id]);
        return rows[0];
    } catch (error) {
        console.error("Error during getCategorieById", error);
        throw error;
    }
}

async function createCategorie(libelle_categorie, description_categorie) {
    try {
        const { rows } = await pool.query(
            "INSERT INTO categorie (libelle_categorie, description_categorie) VALUES ($1, $2) RETURNING id_categorie",
            [libelle_categorie, description_categorie]
        );
        return rows[0].id_categorie;
    } catch (error) {
        console.error("Error during createCategorie", error);
        throw error;
    }
}

async function deleteCategorie(id_categorie) {
    try {
        await pool.query("DELETE FROM categorie WHERE id_categorie = $1", [id_categorie]);
    } catch (error) {
        console.error("Error during deleteCategorie", error);
        throw error;
    }
}

async function updateCategorie(id_categorie, libelle_categorie, description_categorie) {
    try {
        await pool.query(
            "UPDATE categorie SET libelle_categorie = $1, description_categorie = $2 WHERE id_categorie = $3",
            [libelle_categorie, description_categorie, id_categorie]
        );
        return await getCategorieById(id_categorie);
    } catch (error) {
        console.error("Error during updateCategorie", error);
        throw error;
    }
}

module.exports = {
    getAllCategories,
    getCategorieById,
    createCategorie,
    deleteCategorie,
    updateCategorie,
};
