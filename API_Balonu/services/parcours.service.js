const pool = require('../config/db');

async function createParcours(libelle_parcours, distance_parcours, duree_parcours) {
    try {
        const { rows } = await pool.query(
            "INSERT INTO parcours (libelle_parcours, distance_parcours, duree_parcours) VALUES ($1, $2, $3) RETURNING *",
            [libelle_parcours, distance_parcours, duree_parcours]
        );
        return rows[0];
    } catch (error) {
        console.error("Error during createParcours", error);
        throw error;
    }
}

async function getAllParcours() {
    try {
        const { rows } = await pool.query("SELECT * FROM parcours");
        return rows;
    } catch (error) {
        console.error("Error during getAllParcours", error);
        throw error;
    }
}

async function getParcoursById(id_parcours) {
    try {
        const { rows } = await pool.query("SELECT * FROM parcours WHERE id_parcours = $1", [id_parcours]);
        return rows[0];
    } catch (error) {
        console.error("Error during getParcoursById", error);
        throw error;
    }
}

async function updateParcours(id_parcours, libelle_parcours, distance_parcours, duree_parcours) {
    try {
        const { rows } = await pool.query(
            "UPDATE parcours SET libelle_parcours = $1, distance_parcours = $2, duree_parcours = $3 WHERE id_parcours = $4 RETURNING *",
            [libelle_parcours, distance_parcours, duree_parcours, id_parcours]
        );
        return rows[0];
    } catch (error) {
        console.error("Error during updateParcours", error);
        throw error;
    }
}

async function deleteParcours(id_parcours) {
    try {
        const result = await pool.query("DELETE FROM parcours WHERE id_parcours = $1", [id_parcours]);
        return result.rowCount;
    } catch (error) {
        console.error("Error during deleteParcours", error);
        throw error;
    }
}

module.exports = {
    createParcours,
    getAllParcours,
    getParcoursById,
    updateParcours,
    deleteParcours,
};
