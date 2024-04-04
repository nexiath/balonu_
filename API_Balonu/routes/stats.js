const express = require("express");
const pool = require('../config/db');
const router = express.Router();

// Route pour obtenir les statistiques combinées des vols
router.get('/statistiques-combinees', async (req, res) => {
    try {
        const prixMoyenResult = await pool.query('SELECT AVG(prix_vol) AS prixMoyen FROM vol;');
        const prixMinimumResult = await pool.query('SELECT MIN(prix_vol) AS prixMinimum FROM vol;');
        const prixMaximumResult = await pool.query('SELECT MAX(prix_vol) AS prixMaximum FROM vol;');

        const statistiques = {
            prixMoyen: parseFloat(prixMoyenResult.rows[0].prixmoyen).toFixed(2),
            prixMinimum: parseFloat(prixMinimumResult.rows[0].prixminimum).toFixed(2),
            prixMaximum: parseFloat(prixMaximumResult.rows[0].prixmaximum).toFixed(2)
        };

        res.json(statistiques);
    } catch (error) {
        handleDatabaseError(res, error);
    }
});

// Utilitaire pour gérer les erreurs de la base de données
function handleDatabaseError(res, error) {
    console.error('Erreur lors de la récupération des statistiques des vols:', error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération des statistiques des vols." });
}

module.exports = router;
