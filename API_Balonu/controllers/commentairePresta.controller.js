const CommentairesService = require('../services/commentairePresta.service');

async function getCommentaires(req, res) {
  const prestataireId = req.params.id;
  try {
    const comments = await CommentairesService.getCommentairesByPrestataireId(prestataireId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function addCommentaire(req, res) {
  const prestataireId = req.params.id;
  const { pseudo, contenu_commentaire } = req.body;
  try {
    await CommentairesService.addCommentaire(prestataireId, pseudo, contenu_commentaire);
    res.status(201).json({ message: 'Commentaire ajouté avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteCommentaire(req, res) {
  const commentaireId = req.params.id;
  try {
    await CommentairesService.deleteCommentaire(commentaireId);
    res.json({ message: 'Commentaire supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateCommentaire(req, res) {
  const commentaireId = req.params.commentaireId;
  const { pseudo, contenu_commentaire } = req.body;
  try {
    await CommentairesService.updateCommentaire(commentaireId, pseudo, contenu_commentaire);
    res.status(200).send('Commentaire mis à jour avec succès');
  } catch (error) {
    res.status(500).send('Erreur lors de la mise à jour du commentaire');
  }
}

module.exports = {
  getCommentaires,
  addCommentaire,
  deleteCommentaire,
  updateCommentaire,
  
};
