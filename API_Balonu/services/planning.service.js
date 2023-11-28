const pool = require('../config/db');
async function createPlanning(date_debut, date_fin) {
    try {
        const { rows } = await pool.query("INSERT INTO planning (date_debut, date_fin) VALUES ($1, $2) RETURNING id_planning", [date_debut, date_fin]);
        return rows[0].id_planning;
    } catch (error) {
        console.error("Error during createPlanning", error);
        throw error;
    }
}

async function getAllPlannings() {
    try {
        const { rows } = await pool.query("SELECT * FROM planning");
        return rows;
    } catch (error) {
        console.error("Error during getAllPlannings", error);
        throw error;
    }
}

async function getPlanningById(id) {
    try {
        const { rows } = await pool.query("SELECT * FROM planning WHERE id_planning = $1", [id]);
        return rows[0];
    } catch (error) {
        console.error("Error during getPlanningById", error);
        throw error;
    }
}

async function updatePlanning(id, date_debut, date_fin) {
    try {
        await pool.query("UPDATE planning SET date_debut = $1, date_fin = $2 WHERE id_planning = $3", [date_debut, date_fin, id]);
        return await getPlanningById(id);
    } catch (error) {
        console.error("Error during updatePlanning", error);
        throw error;
    }
}

async function deletePlanning(id) {
    try {
        await pool.query("DELETE FROM planning WHERE id_planning = $1", [id]);
    } catch (error) {
        console.error("Error during deletePlanning", error);
        throw error;
    }
}

module.exports = {
    createPlanning,
    getAllPlannings,
    getPlanningById,
    updatePlanning,
    deletePlanning,
};
