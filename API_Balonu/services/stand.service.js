const pool = require('../config/db');

async function getAllStands() {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM stand');
        return result.rows;
    } catch (error) {
        console.error('Error during getAllStands', error);
        throw error;
    } finally {
        client.release();
    }
}

async function getStandById(id) {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM stand WHERE id_stand = $1', [id]);
        if (result.rows.length === 0) {
            throw new Error('Stand not found');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error during getStandById', error);
        throw error;
    } finally {
        client.release();
    }
}

async function getStandsByIdUtilisateur(userId) {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT s.* FROM stand s INNER JOIN affectationStand ast ON s.id_stand = ast.id_stand WHERE ast.id_utilisateur = $1',
            [userId]
        );
        return result.rows;
    } catch (error) {
        console.error('Error during getMyStands', error);
        throw error;
    } finally {
        client.release();
    }
}


async function createStand(userId, libelle_stand, description_stand, image_stand, id_emplacement, id_categorie_stand) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const result = await client.query(
            'INSERT INTO stand (libelle_stand, description_stand, image_stand, id_emplacement, id_categorie_stand) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [libelle_stand, description_stand, image_stand, id_emplacement, id_categorie_stand]
        );
        const stand = result.rows[0];

        await client.query(
            'INSERT INTO affectationStand(id_utilisateur, id_stand) VALUES ($1, $2)',
            [userId, stand.id_stand]
        );

        await client.query('COMMIT');
        return stand;
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error during createStand', error);
        throw error;
    } finally {
        client.release();
    }
}

async function updateStand(id_stand, libelle_stand, description_stand, image_stand, id_emplacement, id_categorie_stand) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const result = await client.query(
            'UPDATE stand SET libelle_stand = $1, description_stand = $2, image_stand = $3, id_emplacement = $4, id_categorie_stand = $5 WHERE id_stand = $6 RETURNING *',
            [libelle_stand, description_stand, image_stand, id_emplacement, id_categorie_stand, id_stand]
        );

        await client.query('COMMIT');
        if (result.rows.length === 0) {
            throw new Error('Stand not found');
        }
        return result.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error during updateStand', error);
        throw error;
    } finally {
        client.release();
    }
}

async function deleteStand(id_stand, userId) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const checkPermission = await client.query(
            'SELECT * FROM affectationStand WHERE id_utilisateur = $1 AND id_stand = $2',
            [userId, id_stand]
        );

        if (checkPermission.rowCount === 0) {
            throw new Error("L'utilisateur n'est pas autorisé à supprimer ce stand");
        }

        const result = await client.query('DELETE FROM stand WHERE id_stand = $1 RETURNING *', [id_stand]);

        await client.query('COMMIT');
        if (result.rows.length === 0) {
            throw new Error('Stand not found or already deleted');
        }
        return result.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error during deleteStand', error);
        throw error;
    } finally {
        client.release();
    }
}

async function getStandsByIdEmplacement(id_emplacement) {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM stand WHERE id_emplacement = $1', [id_emplacement]);
        return result.rows;
    } catch (error) {
        console.error('Error during getStandsByIdEmplacement', error);
        throw error;
    } finally {
        client.release();
    }
}

async function getStandsByCategorie(id_categorie_stand) {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM stand WHERE id_categorie_stand = $1', [id_categorie_stand]);
        return result.rows;
    } catch (error) {
        console.error('Error during getStandsByCategorie', error);
        throw error;
    } finally {
        client.release();
    }
}

module.exports = {
    getAllStands,
    getStandById,
    createStand,
    updateStand,
    deleteStand,
    getStandsByIdEmplacement,
    getStandsByCategorie,
    getStandsByIdUtilisateur,
};
