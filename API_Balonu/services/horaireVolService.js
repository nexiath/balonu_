const pool = require('../config/db');

// Récupérer tous les horaires de vol
async function getHorairesVol() {
    const { rows } = await pool.query("SELECT * FROM horaireVol");
    return rows;
}

// Récupérer un horaire de vol en fonction de son ID
async function getHoraireVolById(id) {
    const { rows } = await pool.query("SELECT * FROM horaireVol WHERE id_horaire_vol = $1", [id]);
    return rows[0];
}

// Créer un nouvel horaire de vol
async function createHoraireVol(date_vol, horaire_vol) {
    const { rows } = await pool.query("INSERT INTO horaireVol (date_vol, horaire_vol) VALUES ($1, $2) RETURNING id_horaire_vol", [date_vol, horaire_vol]);
    return await getHoraireVolById(rows[0].id_horaire_vol);
}

// Supprimer un horaire de vol en fonction de son ID
function deleteHoraireVol(id) {
    return pool.query("DELETE FROM horaireVol WHERE id_horaire_vol = $1", [id]);
}

// Mettre à jour un horaire de vol
async function updateHoraireVol(id_horaire_vol, date_vol, horaire_vol) {
    console.log("Updating horaire_vol with ID:", id_horaire_vol);
    try {
        await pool.query("UPDATE horaireVol SET date_vol = $1, horaire_vol = $2 WHERE id_horaire_vol = $3", [date_vol, horaire_vol, id_horaire_vol]);
        console.log("Horaire_vol updated successfully");
        return await getHoraireVolById(id_horaire_vol);
    } catch (error) {
        console.error("Error updating horaire_vol:", error);
        throw error;
    }
}




module.exports = {
    getHorairesVol,
    getHoraireVolById,
    createHoraireVol,
    deleteHoraireVol,
    updateHoraireVol
};
