const pool = require('../config/db');

async function getCommentairesByPrestataireId(prestataireId) {
    try {
        const comments = await pool.query('SELECT * FROM commentaire_prestataire WHERE id_presta = $1', [prestataireId]);
        return comments.rows;
    } catch (error) {
        throw new Error('Erreur lors de la récupération des commentaires');
    }
}

async function addCommentaire(prestataireId, pseudo, contenu_commentaire) {
    try {
        await pool.query('INSERT INTO commentaire_prestataire (id_presta, pseudo,contenu_commentaire) VALUES ($1, $2,$3)', [prestataireId, pseudo, contenu_commentaire]);
    } catch (error) {
        throw new Error('Erreur lors de l\'ajout du commentaire');
    }
}

async function deleteCommentaire(commentaireId) {
    try {
        await pool.query('DELETE FROM commentaire_prestataire WHERE id_commentaire = $1', [commentaireId]);
    } catch (error) {
        throw new Error('Erreur lors de la suppression du commentaire');
    }
}

async function updateCommentaire(commentaireId, pseudo, contenu_commentaire) {
    try {
        await pool.query('UPDATE commentaire_prestataire SET pseudo = $1,  contenu_commentaire= $2 WHERE id_commentaire = $3', [pseudo, contenu_commentaire, commentaireId]);
    } catch (error) {
        throw new Error('Erreur lors de la mise à jour du commentaire');
    }
}

module.exports = {
    getCommentairesByPrestataireId,
    addCommentaire,
    updateCommentaire,
    deleteCommentaire,
};
