const pool = require('../config/db');

async function createVol(prix_vol, libelle_vol, avis_vol, id_montgolfiere, id_parcours, id_planning) {
    try {
        const { rows } = await pool.query("INSERT INTO vol (prix_vol, libelle_vol, avis_vol, id_montgolfiere, id_parcours, id_planning) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_vol", [prix_vol, libelle_vol, avis_vol, id_montgolfiere, id_parcours, id_planning]);
        return rows[0].id_vol;
    } catch (error) {
        console.error("Error during createVol", error);
        throw error;
    }
}

async function getAllVols() {
    try {
        const { rows } = await pool.query("SELECT * FROM vol");
        return rows;
    } catch (error) {
        console.error("Error during getAllVols", error);
        throw error;
    }
}

async function getVolById(id) {
    try {
        const { rows } = await pool.query("SELECT * FROM vol WHERE id_vol = $1", [id]);
        return rows[0];
    } catch (error) {
        console.error("Error during getVolById", error);
        throw error;
    }
}

async function updateVol(id, prix_vol, libelle_vol, avis_vol, id_montgolfiere, id_parcours, id_planning) {
    try {
        await pool.query("UPDATE vol SET prix_vol = $1, libelle_vol = $2, avis_vol = $3, id_montgolfiere = $4, id_parcours = $5, id_planning = $6 WHERE id_vol = $7", [prix_vol, libelle_vol, avis_vol, id_montgolfiere, id_parcours, id_planning, id]);
        return await getVolById(id);
    } catch (error) {
        console.error("Error during updateVol", error);
        throw error;
    }
}

async function deleteVol(id) {
    try {
        await pool.query("DELETE FROM vol WHERE id_vol = $1", [id]);
    } catch (error) {
        console.error("Error during deleteVol", error);
        throw error;
    }
}

module.exports = {
    createVol,
    getAllVols,
    getVolById,
    updateVol,
    deleteVol,
};
