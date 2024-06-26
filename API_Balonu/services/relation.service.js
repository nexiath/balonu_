const pool = require('../config/db');

// --------------------------------------------------------------

async function getAllAffectationsStands() {
    try {
        const { rows } = await pool.query('SELECT * FROM affectationStand');
        return rows;
    } catch (error) {
        console.error('Error during getAllAffectationsStands', error);
        throw error;
    }
}

async function getAffectationStandByIdStand(id_stand) {
    try {
        const { rows } = await pool.query('SELECT * FROM affectationStand WHERE id_stand = $1', [id_stand]);
        return rows[0];
    } catch (error) {
        console.error('Error during getAllAffectationsStands', error);
        throw error;
    }
}

async function deleteAffectationStandByIdStand(id_stand) {
    return pool.query("DELETE FROM affectationStand WHERE id_stand = $1", [id_stand]);
}

async function addUtilisateurToStand(id_utilisateur, id_stand) {
    try {
        const { rows } = await pool.query(
            'INSERT INTO affectationStand (id_utilisateur, id_stand) VALUES ($1, $2) RETURNING *',
            [id_utilisateur, id_stand]
        );
        return rows[0];
    } catch (error) {
        console.error('Error during addUtilisateurToStand', error);
        throw error;
    }
}

// --------------------------------------------------------------

async function getAllVentes() {
    try {
        const { rows } = await pool.query('SELECT * FROM vend');
        return rows;
    } catch (error) {
        console.error('Error during getAllVentes', error);
        throw error;
    }
}

async function getAllProduitsByStand(idStand) {
    try {
        const query = `
            SELECT produit.* 
            FROM produit
            INNER JOIN vend ON produit.id_produit = vend.id_produit
            WHERE vend.id_stand = $1
        `;
        const { rows } = await pool.query(query, [idStand]);
        return rows;
    } catch (error) {
        console.error('Error during getProduitsDetailsByStand', error);
        throw error;
    }
}

async function addProduitToStand(idStand, idProduit) {
    try {
        const { rows } = await pool.query(
            'INSERT INTO vend (id_stand, id_produit) VALUES ($1, $2) RETURNING *',
            [idStand, idProduit]
        );
        return rows[0];
    } catch (error) {
        console.error('Error during addProduitToStand', error);
        throw error;
    }
}

async function getProduitIdFromRelation(idStand, idProduit) {
    try {
        // Utilisez votre logique pour récupérer l'ID du produit en fonction de l'ID de la relation
        const query = 'SELECT id_produit FROM vend WHERE id_stand = $1 AND id_produit = $2';
        const { rows } = await pool.query(query, [idStand, idProduit]);

        if (rows.length === 0) {
            return null; // Ajustez cela en fonction de votre logique
        }

        // Retournez l'ID du produit
        return rows[0].id_produit;
    } catch (error) {
        console.error('Error during getProduitIdFromRelation', error);
        throw error;
    }
}

async function deleteRelationProduitStand(idStand, idProduit) {
    try {
        const query = 'DELETE FROM vend WHERE id_stand = $1 AND id_produit = $2 RETURNING *';
        const { rows } = await pool.query(query, [idStand, idProduit]);

        // Si vous avez besoin de traiter les résultats de la suppression, vous pouvez le faire ici
        console.log(`Relation supprimée pour le produit ${idProduit} et le stand ${idStand}`);

        return rows[0]; // Retournez les lignes supprimées si nécessaire
    } catch (error) {
        console.error('Error during deleteRelationProduitStand', error);
        throw error;
    }
}

// --------------------------------------------------------------

async function getAllAffectationsMontgolfieres() {
    try {
        const { rows } = await pool.query('SELECT * FROM affectationMontgolfiere');
        return rows;
    } catch (error) {
        console.error('Error during getAllAffectationsMontgolfieres', error);
        throw error;
    }
}

async function addUtilisateurToMontgolfiere(id_utilisateur, id_montgolfiere) {
    try {
        const { rows } = await pool.query(
            'INSERT INTO affectationMontgolfiere (id_utilisateur, id_montgolfiere) VALUES ($1, $2) RETURNING *',
            [id_utilisateur, id_montgolfiere]
        );
        return rows[0];
    } catch (error) {
        console.error('Error during addUtilisateurToMontgolfiere', error);
        throw error;
    }
}



// --------------------------------------------------------------

async function getAllAffectationsVols() {
    try {
        const { rows } = await pool.query('SELECT * FROM affectationVol');
        return rows;
    } catch (error) {
        console.error('Error during getAllAffectationsVols', error);
        throw error;
    }
}


async function addUtilisateurToVol(idUtilisateur, idVol) {
    try {
        const { rows } = await pool.query(
            'INSERT INTO affectationVol (id_utilisateur, id_vol) VALUES ($1, $2) RETURNING *',
            [idUtilisateur, idVol]
        );
        return rows[0];
    } catch (error) {
        console.error('Error during addUtilisateurToVol', error);
        throw error;
    }
}

// --------------------------------------------------------------

async function getAllReservations() {
    try {
        const { rows } = await pool.query('SELECT * FROM reserve');
        return rows;
    } catch (error) {
        console.error('Error during getAllReservations', error);
        throw error;
    }
}


async function reserveEmplacement(idUtilisateur, idStand, idEmplacement, idDateReservation) {
    try {
        const { rows } = await pool.query(
            'INSERT INTO reserve (id_utilisateur, id_stand, id_emplacement, id_date_reservation) VALUES ($1, $2, $3, $4) RETURNING *',
            [idUtilisateur, idStand, idEmplacement, idDateReservation]
        );
        return rows[0];
    } catch (error) {
        console.error('Error during reserveEmplacement', error);
        throw error;
    }
}



module.exports = {
    addUtilisateurToStand,
    addProduitToStand,
    addUtilisateurToMontgolfiere,
    addUtilisateurToVol,
    reserveEmplacement,
    getAllAffectationsStands,
    getAffectationStandByIdStand,
    deleteAffectationStandByIdStand,
    getAllVentes,
    getAllProduitsByStand,
    getAllAffectationsMontgolfieres,
    getAllAffectationsVols,
    getAllReservations,
    deleteRelationProduitStand,
    getProduitIdFromRelation
};
