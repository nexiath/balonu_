const usersService = require("../services/utilisateur.service");

exports.createUtilisateur = async (req, res) => {
    const { login_utilisateur, mot_de_passe_utilisateur, nom_utilisateur, prenom_utilisateur, mail_utilisateur, telephone_utilisateur, siret_utilisateur, id_role } = req.body;
    try {
        const utilisateur = await usersService.createUtilisateur(login_utilisateur, mot_de_passe_utilisateur, nom_utilisateur, prenom_utilisateur, mail_utilisateur, telephone_utilisateur, siret_utilisateur, id_role);
        res.status(201).json(utilisateur);
    } catch (error) {
        console.error("Error during createUtilisateur", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.login = async (req, res) => {
    const { login_utilisateur, mot_de_passe_utilisateur } = req.body;
    try {
        const result = await usersService.login(login_utilisateur, mot_de_passe_utilisateur);
        if (result.error) {
            res.status(401).json({ message: result.error });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error("Error during login", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getUtilisateurs = async (req, res) => {
    try {
        const data = await usersService.getUtilisateurs();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error during getUtilisateurs", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getUtilisateurByID = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await usersService.getUtilisateurByID(id);
        if (!data) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.status(200).json(data);
        }
    } catch (error) {
        console.error("Error during getUtilisateurByID", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getUtilisateurByRole = async (req, res) => {
    const id_role = req.params.id_role; 
    try {
        const users = await usersService.getUtilisateurByRole(id_role);
        if (users.length === 0) {
            res.status(404).json({ message: "No users found for this role." });
        } else {
            res.status(200).json(users);
        }
    } catch (error) {
        console.error("Error during getUtilisateurByRole", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.updateUtilisateur = async (req, res) => {
    const id = req.params.id;
    const { login_utilisateur, mot_de_passe_utilisateur, nom_utilisateur, prenom_utilisateur, mail_utilisateur, telephone_utilisateur, siret_utilisateur, id_role } = req.body;
    try {
        const utilisateur = await usersService.updateUtilisateur(id, login_utilisateur, mot_de_passe_utilisateur, nom_utilisateur, prenom_utilisateur, mail_utilisateur, telephone_utilisateur, siret_utilisateur, id_role);
        if (!utilisateur) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.status(200).json(utilisateur);
        }
    } catch (error) {
        console.error("Error during updateUtilisateur", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.deleteUtilisateur = async (req, res) => {
    const id = req.params.id;
    try {
        await usersService.deleteUtilisateur(id);
        res.status(204).send();
    } catch (error) {
        console.error("Error during delet   eUtilisateur", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
