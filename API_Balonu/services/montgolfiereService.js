const pool = require('../config/db');

async function createMontgolfiere({ userId, nombre_place, libelle_montgolfiere, photo_montgolfiere, montgolfiere_est_active }) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Insertion dans la table montgolfiere
        const montgolfiereResult = await client.query(
            'INSERT INTO montgolfiere (nombre_place, libelle_montgolfiere, photo_montgolfiere, montgolfiere_est_active) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre_place, libelle_montgolfiere, photo_montgolfiere, montgolfiere_est_active]
        );
        const montgolfiere = montgolfiereResult.rows[0];

        // Insertion dans la table affectationMontgolfiere pour lier l'utilisateur et la montgolfière
        await client.query(
            'INSERT INTO affectationMontgolfiere (id_utilisateur, id_montgolfiere) VALUES ($1, $2)',
            [userId, montgolfiere.id_montgolfiere]
        );

        await client.query('COMMIT');
        return montgolfiere;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

async function checkUserExists(userId) {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM utilisateur WHERE id_utilisateur = $1', [userId]);
        return result.rowCount > 0;
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}
async function getMontgolfieres() {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM montgolfiere');
        return result.rows;
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

async function getMontgolfieresByUtilisateur(userId) {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT m.* FROM montgolfiere m INNER JOIN affectationMontgolfiere am ON m.id_montgolfiere = am.id_montgolfiere WHERE am.id_utilisateur = $1',
            [userId]
        );
        return result.rows;
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

async function getMontgolfiereById(id_montgolfiere) {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM montgolfiere WHERE id_montgolfiere = $1', [id_montgolfiere]);
        if (result.rows.length === 0) {
            throw new Error('Montgolfiere not found');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error during getMontgolfiereById', error);
        throw error;
    } finally {
        client.release();
    }
}

async function updateMontgolfiere(id_montgolfiere, montgolfiereData) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const { nombre_place, libelle_montgolfiere, photo_montgolfiere, montgolfiere_est_active } = montgolfiereData;

        // Assuming that the user's permission check is done elsewhere or not needed
        const result = await client.query(
            'UPDATE montgolfiere SET nombre_place = $1, libelle_montgolfiere = $2, photo_montgolfiere = $3, montgolfiere_est_active = $4 WHERE id_montgolfiere = $5 RETURNING *',
            [nombre_place, libelle_montgolfiere, photo_montgolfiere, montgolfiere_est_active, id_montgolfiere]
        );

        await client.query('COMMIT');
        if (result.rowCount === 0) {
            throw new Error('Montgolfiere not found');
        }
        return result.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

async function deleteMontgolfiere(id_montgolfiere, userId) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Check if the user is linked to the montgolfiere
        const checkPermission = await client.query(
            'SELECT * FROM affectationMontgolfiere WHERE id_utilisateur = $1 AND id_montgolfiere = $2',
            [userId, id_montgolfiere]
        );

        if (checkPermission.rowCount === 0) {
            throw new Error("L'utilisateur n'est pas autorisé à supprimer cette montgolfière");
        }

        // Delete the montgolfiere
        const deleteResult = await client.query('DELETE FROM montgolfiere WHERE id_montgolfiere = $1', [id_montgolfiere]);
        
        if (deleteResult.rowCount === 0) {
            throw new Error('Montgolfiere not found or already deleted');
        }

        await client.query('COMMIT');
        return true;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}


module.exports = {
    createMontgolfiere,
    getMontgolfieres,
    getMontgolfiereById,
    updateMontgolfiere,
    deleteMontgolfiere,
    getMontgolfieresByUtilisateur
};