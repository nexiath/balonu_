const montgolfiereService = require('../services/montgolfiereService');
const jwt = require('jsonwebtoken');



// Middleware pour extraire l'ID utilisateur du token JWT
function extractUserId(req) {
    // Assurez-vous que ce code correspond à votre méthode de validation du token JWT
    // et extrait correctement l'ID utilisateur du token
    const token = req.headers.authorization.split(" ")[1]; // Supposons un format "Bearer <token>"
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id_utilisateur;
}

function authMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1]; // Extrait le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = { id: decoded.id_utilisateur, role: decoded.role };
        next();
    } catch (error) {
        res.status(401).json({ message: "Authentification échouée" });
    }
}

// Créer une montgolfière
async function creerMontgolfiere(req, res) {
    try {
        const userId = extractUserId(req);
        const montgolfiereId = await montgolfiereService.creerMontgolfiereComplete(req.body, userId);
        res.status(201).json({ message: 'Montgolfière créée avec succès', idMontgolfiere: montgolfiereId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Mettre à jour une montgolfière
async function updateMontgolfiere(req, res) {

    const montgolfiereData = req.body; // Data to update the montgolfiere with

    try {
        const userId = extractUserId(req);
        // Supposons que vous passiez également le rôle de l'utilisateur si nécessaire
        const userRole = req.user.role; // Assurez-vous que ce champ existe et est correct
        const updatedMontgolfiere = await montgolfiereService.updateMontgolfiere(req.params.id, req.body, userId, userRole);
        res.status(200).json(updatedMontgolfiere);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Supprimer une montgolfière
async function deleteMontgolfiere(req, res) {
    try {
        const userId = extractUserId(req);
        const userRole = req.user.role; // Assurez-vous que ce champ existe et est correct
        await montgolfiereService.deleteMontgolfiere(req.params.id, userId, userRole);
        res.status(200).json({ message: 'Montgolfière supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Obtenir toutes les montgolfières
async function getMontgolfieres(req, res) {
    try {
        const montgolfieres = await montgolfiereService.getAllMontgolfieres();
        res.status(200).json(montgolfieres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Obtenir une montgolfière par ID
async function getMontgolfiereById(req, res) {
    try {
        const montgolfiere = await montgolfiereService.getMontgolfiereById(req.params.id);
        if (montgolfiere) {
            res.status(200).json(montgolfiere);
        } else {
            res.status(404).json({ message: 'Montgolfière non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getMontgolfieresByUtilisateur(req, res) {
    try {
        const userId = parseInt(req.params.id);
        const montgolfieres = await montgolfiereService.getMontgolfiereByUtilisateur(userId);
        res.status(200).json(montgolfieres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateMontgolfiereActif = async (req, res) => {
    const { id } = req.params; // ID of the montgolfiere to update
    const montgolfiereData = req.body; // Data to update the montgolfiere with

    try {
        // Assuming the updateMontgolfiere function in montgolfiereService is correctly implemented
        const montgolfiere = await montgolfiereService.updateMontgolfiereActif(id, montgolfiereData);
        if (!montgolfiere) {
            res.status(404).send('Montgolfiere not found');
        } else {
            res.status(200).json(montgolfiere);
        }
    } catch (error) {
        if (error.message.includes("n'est pas autorisé")) {
            res.status(403).send("Access Denied: You do not have permission to modify this montgolfiere.");
        } else {
            console.error('Error during updateMontgolfiere', error);
            res.status(500).send('Internal error');
        }
    }
};

async function activerMontgolfiere(req, res) {
    const id = req.params.id;
    try {
        await montgolfiereService.rendreMontgolfiereActive(id);
        res.status(200).send("Montgolfière activée avec succès.");
    } catch (error) {
        console.error("Erreur lors de l'activation de la montgolfière:", error);
        res.status(500).send("Erreur lors de l'activation de la montgolfière.");
    }
}

async function desactiverMontgolfiere(req, res) {
    const id = req.params.id;
    try {
        await montgolfiereService.rendreMontgolfiereInactive(id);
        res.status(200).send("Montgolfière désactivée avec succès.");
    } catch (error) {
        console.error("Erreur lors de la désactivation de la montgolfière:", error);
        res.status(500).send("Erreur lors de la désactivation de la montgolfière.");
    }
};

module.exports = {
    creerMontgolfiere,
    getMontgolfieres,
    getMontgolfiereById,
    updateMontgolfiere,
    deleteMontgolfiere,
    authMiddleware,
    getMontgolfieresByUtilisateur,
    activerMontgolfiere,
    desactiverMontgolfiere
};