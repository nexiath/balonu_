const pool = require('../config/db');

async function getPrestataires() {
    try {
        const { rows } = await pool.query("SELECT * FROM presta");
        return rows;
    } catch (error) {
        console.error("Error during getPrestataires", error);
        throw new Error("Erreur interne");
    }
}

async function getPrestataireByID(id_prestataire) {
    try {
        const { rows } = await pool.query("SELECT * FROM presta WHERE id_presta = $1", [id_prestataire]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    } catch (error) {
        console.error("Error during getPrestataireByID", error);
        throw new Error("Erreur interne");
    }
}


async function deletePrestataire(id_prestataire) {
    try {
        await pool.query("DELETE FROM presta WHERE id_presta = $1", [id_prestataire]);
    } catch (error) {
        console.error("Error during deletePrestataire", error);
        throw new Error("Erreur interne");
    }
}

async function getPrestatairesByUserId(userId) {
    try {
        const { rows } = await pool.query("SELECT * FROM presta WHERE id_utilisateur = $1", [userId]);
        return rows;
    } catch (error) {
        console.error("Error during getPrestatairesByUserId", error);
        throw new Error("Erreur interne lors de la récupération des prestataires par utilisateur");
    }
}

async function checkPrestataireExists(prestataireId) {
    try {
        const { rowCount } = await pool.query('SELECT COUNT(*) FROM presta WHERE id_presta = $1', [prestataireId]);
        return rowCount > 0;
    } catch (error) {
        console.error("Error during checkPrestataireExists", error);
        throw new Error("Erreur interne lors de la vérification de l'existence du prestataire");
    }
}

async function updateDescription(id_presta, editeur_wysiwyg) {
    try {
        await pool.query("UPDATE presta SET editeur_wysiwyg = $1 WHERE id_presta = $2", [editeur_wysiwyg, id_presta]);
        return await getPrestataireByID(id_presta);
    } catch (error) {
        console.error("Error during updateDescription", error);
        throw new Error("Erreur interne");
    }
}

async function updateProfile(id_presta, photo_profil) {
    try {
        await pool.query("UPDATE presta SET photo_profil = $1 WHERE id_presta = $2", [photo_profil, id_presta]);
        return await getPrestataireByID(id_presta);
    } catch (error) {
        console.error("Error during updateProfile", error);
        throw new Error("Erreur interne");
    }
}

async function getServiceVisibility(id_presta, serviceKey) {
    try {
        const { rows } = await pool.query("SELECT services_activables FROM presta WHERE id_presta = $1", [id_presta]);
        if (rows.length > 0) {
            const servicesActivables = rows[0].services_activables;
            return servicesActivables[serviceKey] || false;
        }
        return false;
    } catch (error) {
        console.error("Error during getServiceVisibility", error);
        throw new Error("Erreur interne lors de la récupération de la visibilité du service");
    }
}


async function toggleServiceVisibility(id_presta, serviceKey) {
    try {
        const currentVisibility = await getServiceVisibility(id_presta, serviceKey);
        const newVisibility = !currentVisibility;

        const { rows } = await pool.query("SELECT services_activables FROM presta WHERE id_presta = $1", [id_presta]);
        if (rows.length > 0) {
            let servicesActivables = rows[0].services_activables || {};
            servicesActivables[serviceKey] = newVisibility;

            await pool.query("UPDATE presta SET services_activables = $1 WHERE id_presta = $2", [servicesActivables, id_presta]);
        }

        return newVisibility;
    } catch (error) {
        console.error("Error during toggleServiceVisibility", error);
        throw new Error("Erreur interne lors de la bascule de la visibilité du service");
    }
}



module.exports = {
    getPrestataires,
    getPrestataireByID,
    deletePrestataire,
    updateDescription,
    getPrestatairesByUserId,
    updateProfile,
    checkPrestataireExists,
    getServiceVisibility,
    toggleServiceVisibility,
    
};
