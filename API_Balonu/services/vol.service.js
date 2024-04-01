const pool = require('../config/db');

// Créer un vol
async function creerVol(prix, libelle, avis, idMontgolfiere, idParcours, idPlanning) {
    const res = await pool.query(
        'INSERT INTO vol (prix_vol, libelle_vol, avis_vol, id_montgolfiere, id_parcours, id_planning) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [prix, libelle, avis, idMontgolfiere, idParcours, idPlanning]
    );
    return res.rows[0];
}

// Récupérer un vol par ID
async function obtenirVol(id) {
    const res = await pool.query('SELECT * FROM vol WHERE id_vol = $1', [id]);
    return res.rows[0];
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

// Mettre à jour un vol
async function mettreAJourVol(id, prix, libelle, avis) {
    const res = await pool.query(
        'UPDATE vol SET prix_vol = $1, libelle_vol = $2, avis_vol = $3 WHERE id_vol = $4 RETURNING *',
        [prix, libelle, avis, id]
    );
    return res.rows[0];
}

// Supprimer un vol
async function supprimerVol(id) {
    await pool.query('DELETE FROM vol WHERE id_vol = $1', [id]);
}
async function getVolByParcours(idParcours) {
    try {
        const { rows } = await pool.query("SELECT * FROM vol WHERE id_parcours = $1", [idParcours]);
        return rows;
    } catch (error) {
        console.error("Error during getVolByParcours", error);
        throw error;
    }
}

module.exports = {
    creerVol,
    obtenirVol,
    mettreAJourVol,
    getVolByParcours,
    supprimerVol,
    getAllVols
};
