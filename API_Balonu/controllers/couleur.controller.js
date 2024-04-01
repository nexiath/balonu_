const couleurService = require('../services/couleur.service');

// Ajouter une couleur
async function ajouterCouleur(req, res) {
    const { libelle_couleur } = req.body;
    try {
        const couleur = await couleurService.ajouterCouleur(libelle_couleur);
        res.json(couleur);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'ajout de la couleur.' });
    }
}

// Obtenir une couleur par ID
async function obtenirCouleur(req, res) {
    const { id } = req.params;
    try {
        const couleur = await couleurService.obtenirCouleur(id);
        if (!couleur) {
            res.status(404).json({ error: 'Couleur non trouvée.' });
        } else {
            res.json(couleur);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de la couleur.' });
    }
}

// Mettre à jour une couleur
async function mettreAJourCouleur(req, res) {
    const { id } = req.params;
    const { libelle_couleur } = req.body;
    try {
        const couleur = await couleurService.mettreAJourCouleur(id, libelle_couleur);
        if (!couleur) {
            res.status(404).json({ error: 'Couleur non trouvée.' });
        } else {
            res.json(couleur);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la couleur.' });
    }
}

// Supprimer une couleur
async function supprimerCouleur(req, res) {
    const { id } = req.params;
    try {
        await couleurService.supprimerCouleur(id);
        res.json({ message: 'Couleur supprimée avec succès.' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la couleur.' });
    }
}

async function obtenirToutesLesCouleurs(req, res) {
    try {
        const couleurs = await couleurService.obtenirToutesLesCouleurs();
        res.json(couleurs);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de la liste des couleurs.' });
    }
}

module.exports = {
    ajouterCouleur,
    obtenirCouleur,
    mettreAJourCouleur,
    supprimerCouleur,
    obtenirToutesLesCouleurs
};
