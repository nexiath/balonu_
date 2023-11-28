const pool = require('../config/db');

async function getAllCategories() {
    try {
        const { rows } = await pool.query('SELECT * FROM categorie_stand');
        return rows;
    } catch (error) {
        console.error('Error during getAllCategories', error);
        throw error;
    }
}

async function getCategorieById(id) {
    try {
        const { rows } = await pool.query('SELECT * FROM categorie_stand WHERE id_categorie_stand = $1', [id]);
        return rows[0];
    } catch (error) {
        console.error('Error during getStandsByCategorie', error);
        throw error;
    }
}

async function createCategorieStand(libelle_categorie_stand) {
    try {
        const { rows } = await pool.query(
            'INSERT INTO categorie_stand (libelle_categorie_stand) VALUES ($1) RETURNING *',
            [libelle_categorie_stand]
        );
        return rows[0];
    } catch (error) {
        console.error('Error during createCategorieStand', error);
        throw error;
    }
}

async function updateCategorieStand(id_categorie_stand, libelle_categorie_stand) {
    try {
        const { rows } = await pool.query(
            'UPDATE categorie_stand SET libelle_categorie_stand = $1 WHERE id_categorie_stand = $2 RETURNING *',
            [libelle_categorie_stand, id_categorie_stand]
        );
        return rows[0];
    } catch (error) {
        console.error('Error during updateStand', error);
        throw error;
    }
}


async function deleteCategorieStand(id) {
    try {
        const { rows } = await pool.query('DELETE FROM categorie_stand WHERE id_categorie_stand = $1 RETURNING *', [id]);
        return rows[0];
    } catch (error) {
        console.error('Error during deleteStand', error);
        throw error;
    }
}

module.exports = {
    getAllCategories,
    getCategorieById,
    createCategorieStand,
    updateCategorieStand,
    deleteCategorieStand,
};
