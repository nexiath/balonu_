const categorieService = require("../services/categorie.service");

exports.createCategorie = async (req, res) => {
    const { libelle_categorie, description_categorie } = req.body;
    try {
        const categorieId = await categorieService.createCategorie(libelle_categorie, description_categorie);
        res.status(201).json({ id_categorie: categorieId, message: 'Catégorie créée avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de la catégorie' });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categorieService.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des catégories' });
    }
};

exports.getCategorieById = async (req, res) => {
    const id = req.params.id;
    try {
        const categorie = await categorieService.getCategorieById(id);
        if (!categorie) {
            res.status(404).json({ message: 'Catégorie non trouvée' });
        } else {
            res.status(200).json(categorie);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de la catégorie' });
    }
};

exports.updateCategorie = async (req, res) => {
    const id = req.params.id;
    const { libelle_categorie, description_categorie } = req.body;
    try {
        const updatedCategorie = await categorieService.updateCategorie(id, libelle_categorie, description_categorie);
        if (!updatedCategorie) {
            res.status(404).json({ message: 'Catégorie non trouvée' });
        } else {
            res.status(200).json(updatedCategorie);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la catégorie' });
    }
};

exports.deleteCategorie = async (req, res) => {
    const id = req.params.id;
    try {
        await categorieService.deleteCategorie(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la catégorie' });
    }
};
