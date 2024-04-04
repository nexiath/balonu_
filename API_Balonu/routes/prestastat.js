const express = require("express");
const pool = require('../config/db');
const router = express.Router();

// Route pour obtenir le top 3 des prestataires avec le plus grand nombre de vues
router.get('/top-prestataires', async (req, res) => {
    try {
        const topPrestatairesQuery = `
            SELECT u.nom_utilisateur, u.prenom_utilisateur, COUNT(DISTINCT av.id_vol) AS nombre_vues
            FROM utilisateur u
                     LEFT JOIN affectationVol av ON u.id_utilisateur = av.id_utilisateur
            GROUP BY u.nom_utilisateur, u.prenom_utilisateur
            ORDER BY COUNT(DISTINCT av.id_vol) DESC
            LIMIT 3;

        `;

        const topPrestatairesResult = await pool.query(topPrestatairesQuery);

        const topPrestataires = topPrestatairesResult.rows.map(row => ({
            nom: row.nom_utilisateur,
            prenom: row.prenom_utilisateur,
            nombre_vues: row.nombre_vues
        }));

        res.json(topPrestataires);
    } catch (error) {
        handleDatabaseError(res, error);
    }
});

// Utilitaire pour gérer les erreurs de la base de données
function handleDatabaseError(res, error) {
    console.error('Erreur lors de la récupération du top 3 des prestataires:', error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération du top 3 des prestataires." });
}

module.exports = router;
