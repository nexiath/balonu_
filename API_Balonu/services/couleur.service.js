const pool = require('../config/db');

async function createCouleur(libelle_couleur) {
    try {
        const { rows } = await pool.query("INSERT INTO couleur (libelle_couleur) VALUES ($1) RETURNING id_couleur", [libelle_couleur]);
        return rows[0].id_couleur;
    } catch (error) {
        console.error("Error during createCouleur", error);
        throw error;
    }
}

async function getAllCouleurs() {
    try {
        const { rows } = await pool.query("SELECT * FROM couleur");
        return rows;
    } catch (error) {
        console.error("Error during getAllCouleurs", error);
        throw error;
    }
}

async function getCouleurById(id) {
    try {
        const { rows } = await pool.query("SELECT * FROM couleur WHERE id_couleur = $1", [id]);
        return rows[0];
    } catch (error) {
        console.error("Error during getCouleurById", error);
        throw error;
    }
}

async function updateCouleur(id, libelle_couleur) {
    try {
        await pool.query("UPDATE couleur SET libelle_couleur = $1 WHERE id_couleur = $2", [libelle_couleur, id]);
        return await getCouleurById(id);
    } catch (error) {
        console.error("Error during updateCouleur", error);
        throw error;
    }
}

async function deleteCouleur(id) {
    try {
        await pool.query("DELETE FROM couleur WHERE id_couleur = $1", [id]);
    } catch (error) {
        console.error("Error during deleteCouleur", error);
        throw error;
    }
}

module.exports = {
    createCouleur,
    getAllCouleurs,
    getCouleurById,
    updateCouleur,
    deleteCouleur,
};
