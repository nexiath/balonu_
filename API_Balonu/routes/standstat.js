const express = require("express");
const pool = require('../config/db');
const router = express.Router();

// Route pour obtenir les statistiques des stands
router.get('/statistiques-stands', async (req, res) => {
    try {
        const topStandsQuery = `
            SELECT s.libelle_stand, SUM(p.prix_produit) AS chiffre_affaire
            FROM stand s
                     INNER JOIN vend v ON s.id_stand = v.id_stand
                     INNER JOIN produit p ON v.id_produit = p.id_produit
            GROUP BY s.libelle_stand
            ORDER BY chiffre_affaire DESC
            LIMIT 3;
        `;

        const topProductsQuery = `
            SELECT p.libelle_produit, COUNT(v.id_produit) AS nombre_ventes
            FROM vend v
                     INNER JOIN produit p ON v.id_produit = p.id_produit
            GROUP BY p.libelle_produit
            ORDER BY nombre_ventes DESC
            LIMIT 5;
        `;

        const topCategoriesQuery = `
            SELECT cs.libelle_categorie_stand, SUM(p.prix_produit) AS chiffre_affaire
            FROM vend v
                     INNER JOIN produit p ON v.id_produit = p.id_produit
                     INNER JOIN stand s ON v.id_stand = s.id_stand
                     INNER JOIN categorie_stand cs ON s.id_categorie_stand = cs.id_categorie_stand
            GROUP BY cs.libelle_categorie_stand
            ORDER BY chiffre_affaire DESC;
        `;

        const topStandsResult = await pool.query(topStandsQuery);
        const topProductsResult = await pool.query(topProductsQuery);
        const topCategoriesResult = await pool.query(topCategoriesQuery);

        const statistics = {
            topStands: topStandsResult.rows,
            topProducts: topProductsResult.rows,
            topCategories: topCategoriesResult.rows
        };

        res.json(statistics);
    } catch (error) {
        handleDatabaseError(res, error);
    }
});

// Utilitaire pour gérer les erreurs de la base de données
function handleDatabaseError(res, error) {
    console.error('Erreur lors de la récupération des statistiques des stands:', error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération des statistiques des stands." });
}

module.exports = router;
