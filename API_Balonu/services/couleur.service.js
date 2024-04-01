const pool = require('../config/db');

async function ajouterCouleur(libelleCouleur) {
    const res = await pool.query(
        'INSERT INTO couleur (libelle_couleur) VALUES ($1) RETURNING *',
        [libelleCouleur]
    );
    return res.rows[0];
}

// Récupérer une couleur par ID
async function obtenirCouleur(id) {
    const res = await pool.query('SELECT * FROM couleur WHERE id_couleur = $1', [id]);
    return res.rows[0];
}

// Mettre à jour une couleur
async function mettreAJourCouleur(id, libelleCouleur) {
    const res = await pool.query(
        'UPDATE couleur SET libelle_couleur = $1 WHERE id_couleur = $2 RETURNING *',
        [libelleCouleur, id]
    );
    return res.rows[0];
}

async function obtenirToutesLesCouleurs() {
    const res = await pool.query('SELECT * FROM couleur');
    return res.rows;
}


// Supprimer une couleur
async function supprimerCouleur(id) {
    await pool.query('DELETE FROM couleur WHERE id_couleur = $1', [id]);
}

module.exports = {
    ajouterCouleur,
    obtenirCouleur,
    mettreAJourCouleur,
    supprimerCouleur,
    obtenirToutesLesCouleurs
};
