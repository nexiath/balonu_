const jwt = require('jsonwebtoken');
const pool = require('../config/db');

async function login(login_utilisateur, mot_de_passe_utilisateur) {
    try {
        const { rows } = await pool.query("SELECT * FROM utilisateur WHERE login_utilisateur = $1", [login_utilisateur]);
        if (rows.length === 0) {
            return { error: 'Utilisateur non trouvé' };
        }
        const utilisateur = rows[0];
        if (utilisateur.mot_de_passe_utilisateur !== mot_de_passe_utilisateur) {
            return { error: 'Mot de passe incorrect' };
        }

        const token = jwt.sign(
            { id_utilisateur: utilisateur.id_utilisateur },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        console.log(token);

        return { utilisateur: { id_utilisateur: utilisateur.id_utilisateur }, token };
    } catch (error) {
        console.error("Error during login", error);
        throw new Error("Erreur interne");
    }
}

async function createUtilisateur(login_utilisateur, mot_de_passe_utilisateur, nom_utilisateur, prenom_utilisateur, mail_utilisateur, telephone_utilisateur, siret_utilisateur, id_role) {
    try {
        await pool.query('BEGIN');

        const { rows } = await pool.query(
            "INSERT INTO utilisateur (login_utilisateur, mot_de_passe_utilisateur, nom_utilisateur, prenom_utilisateur, mail_utilisateur, telephone_utilisateur, siret_utilisateur, id_role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id_utilisateur",
            [login_utilisateur, mot_de_passe_utilisateur, nom_utilisateur, prenom_utilisateur, mail_utilisateur, telephone_utilisateur, siret_utilisateur, id_role]
        );
        const utilisateurID = rows[0].id_utilisateur;

        let servicesActivables = {};
        if (id_role == 1) {
            servicesActivables = {
                "Livre d'or": true,
                "Comptage de visiteurs": true,
                "Les Stands": true
            };
        } else if (id_role == 2) {
            servicesActivables = {
                "Livre d'or": true,
                "Comptage de visiteurs": true,
                "Les Montgolfières": true
            };
        }
        await pool.query(
            "INSERT INTO presta (id_utilisateur, photo_profil, editeur_wysiwyg, nombre_visiteurs, services_activables) VALUES ($1, $2, $3, $4, $5 )",
            [utilisateurID, 'URL_photo_profil_par_defaut', '<p>Description par défaut</p>', 0, JSON.stringify(servicesActivables)]
        );
        console.log(JSON.stringify(servicesActivables))
        await pool.query('COMMIT');
        return await getUtilisateurByID(utilisateurID);
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error("Error during createUtilisateur", error);
        throw new Error("Erreur interne");
    }
}

async function getUtilisateurs() {
    try {
        const { rows } = await pool.query("SELECT * FROM utilisateur");
        return rows;
    } catch (error) {
        console.error("Error during getUtilisateurs", error);
        throw new Error("Erreur interne");
    }
}

async function getUtilisateurByID(id_utilisateur) {
    try {
        const { rows } = await pool.query("SELECT * FROM utilisateur WHERE id_utilisateur = $1", [id_utilisateur]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    } catch (error) {
        console.error("Error during getUtilisateurByID", error);
        throw new Error("Erreur interne");
    }
}

async function getUtilisateurByRole(id_role) {
    try {
        const { rows } = await pool.query("SELECT * FROM utilisateur WHERE id_role = $1", [id_role]);
        return rows;
    } catch (error) {
        console.error("Error during getUtilisateurByRole", error);
        throw new Error("Erreur interne");
    }
}

async function deleteUtilisateur(id_utilisateur) {
    try {
        await pool.query("DELETE FROM presta WHERE id_utilisateur = $1", [id_utilisateur]);

        await pool.query("DELETE FROM utilisateur WHERE id_utilisateur = $1", [id_utilisateur]);
    } catch (error) {
        console.error("Error during deleteUtilisateur", error);
        throw new Error("Erreur interne");
    }
}

async function updateUtilisateur(id_utilisateur, login_utilisateur, mot_de_passe_utilisateur, nom_utilisateur, prenom_utilisateur, mail_utilisateur, telephone_utilisateur, siret_utilisateur, id_role) {
    try {
        await pool.query("UPDATE utilisateur SET login_utilisateur = $1, mot_de_passe_utilisateur = $2, nom_utilisateur = $3, prenom_utilisateur = $4, mail_utilisateur = $5, telephone_utilisateur = $6, siret_utilisateur = $7, id_role = $8 WHERE id_utilisateur = $9", [login_utilisateur, mot_de_passe_utilisateur, nom_utilisateur, prenom_utilisateur, mail_utilisateur, telephone_utilisateur, siret_utilisateur, id_role, id_utilisateur]);
        return await getUtilisateurByID(id_utilisateur);
    } catch (error) {
        console.error("Error during updateUtilisateur", error);
        throw new Error("Erreur interne");
    }
}

async function checkUserExists (userId) {
    try {
        const { rows } = await pool.query("SELECT id_utilisateur FROM utilisateur WHERE id_utilisateur = $1", [userId]);
        return rows.length > 0;
    } catch (error) {
        console.error("Error during checkUserExists", error);
        throw new Error("Erreur interne lors de la vérification de l'existence de l'utilisateur");
    }
};

module.exports = {
    getUtilisateurs,
    getUtilisateurByID,
    createUtilisateur,
    deleteUtilisateur,
    updateUtilisateur,
    login,
    getUtilisateurByRole,
    checkUserExists
};
