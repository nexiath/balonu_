const pool = require('../config/db');

async function createEmplacement(libelle_emplacement, capacite_emplacement, caracteristique_emplacement, point_eau_nombre, prise_nombre, coordonnee_x, coordonnee_y) {
    try {
        const { rows } = await pool.query(
            'INSERT INTO emplacement (libelle_emplacement, capacite_emplacement, caracteristique_emplacement, point_eau_nombre, prise_nombre, coordonnee_x, coordonnee_y) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [libelle_emplacement, capacite_emplacement, caracteristique_emplacement, point_eau_nombre, prise_nombre, coordonnee_x, coordonnee_y]
        );
        return rows[0];
    } catch (error) {
        console.error('Error during createEmplacement', error);
        throw error;
    }
}

async function getAllEmplacements() {
    try {
        const { rows } = await pool.query('SELECT * FROM emplacement');
        return rows;
    } catch (error) {
        console.error('Error during getAllEmplacements', error);
        throw error;
    }
}

async function getEmplacementById(id) {
    try {
        const { rows } = await pool.query('SELECT * FROM emplacement WHERE id_emplacement = $1', [id]);
        return rows[0];
    } catch (error) {
        console.error('Error during getEmplacementById', error);
        throw error;
    }
}

async function updateEmplacement(id, libelle_emplacement, capacite_emplacement, caracteristique_emplacement, point_eau_nombre, prise_nombre, coordonnee_x, coordonnee_y) {
    try {
        const { rows } = await pool.query(
            'UPDATE emplacement SET libelle_emplacement = $2, capacite_emplacement = $3, caracteristique_emplacement = $4, point_eau_nombre = $5, prise_nombre = $6, coordonnee_x =$7, coordonnee_y = $8 WHERE id_emplacement = $1 RETURNING *',
            [id, libelle_emplacement, capacite_emplacement, caracteristique_emplacement, point_eau_nombre, prise_nombre, coordonnee_x, coordonnee_y]
        );
        return rows[0];
    } catch (error) {
        console.error('Error during updateEmplacement', error);
        throw error;
    }
}

async function deleteEmplacement(id) {
    try {
        const { rows } = await pool.query('DELETE FROM emplacement WHERE id_emplacement = $1 RETURNING *', [id]);
        return rows[0];
    } catch (error) {
        console.error('Error during deleteEmplacement', error);
        throw error;
    }
}

async function getEmplacementsWithoutStand() {
    try {
        const { rows } = await pool.query(`
            SELECT *
            FROM emplacement
            WHERE NOT EXISTS (
                SELECT 1
                FROM stand
                WHERE stand.id_emplacement = emplacement.id_emplacement
            )
        `);
        return rows;
    } catch (error) {
        console.error('Error during getEmplacementsWithoutStand', error);
        throw error;
    }
}

module.exports = {
    createEmplacement,
    getAllEmplacements,
    getEmplacementById,
    updateEmplacement,
    deleteEmplacement,
    getEmplacementsWithoutStand
};
