const pool = require('../config/db');

async function creerMontgolfiereComplete(data, idUtilisateur) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const { nombrePlace, libelle, photo, estActive, idCouleur, prixVol, libelleVol, avisVol, idParcours, dateDebut, dateFin } = data;

        // Créer la montgolfière
        const resMontgolfiere = await client.query(
            'INSERT INTO montgolfiere (nombre_place, libelle_montgolfiere, photo_montgolfiere, montgolfiere_est_active) VALUES ($1, $2, $3, $4) RETURNING id_montgolfiere',
            [nombrePlace, libelle, photo, estActive]
        );
        const idMontgolfiere = resMontgolfiere.rows[0].id_montgolfiere;

        // Associer la montgolfière à l'utilisateur
        await client.query(
            'INSERT INTO affectationMontgolfiere (id_montgolfiere, id_utilisateur) VALUES ($1, $2)',
            [idMontgolfiere, idUtilisateur]
        );

        // Définir la couleur
        await client.query(
            'INSERT INTO est (id_montgolfiere, id_couleur) VALUES ($1, $2)',
            [idMontgolfiere, idCouleur]
        );

        // Créer le planning
        const resPlanning = await client.query(
            'INSERT INTO planning (date_debut, date_fin) VALUES ($1, $2) RETURNING id_planning',
            [dateDebut, dateFin]
        );
        const idPlanning = resPlanning.rows[0].id_planning;

        // Créer le vol
        const resVol = await client.query(
            'INSERT INTO vol (prix_vol, libelle_vol, avis_vol, id_montgolfiere, id_parcours, id_planning) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_vol',
            [prixVol, libelleVol, avisVol, idMontgolfiere, idParcours, idPlanning]
        );
        const idVol = resVol.rows[0].id_vol;

        // Récupérer les informations de l'utilisateur
        const resUtilisateur = await client.query(
            'SELECT nom_utilisateur, prenom_utilisateur FROM utilisateur WHERE id_utilisateur = $1',
            [idUtilisateur]
        );
        const utilisateur = resUtilisateur.rows[0];

        await client.query('COMMIT');

        // Retourner un objet avec toutes les informations pertinentes
        return {
            idMontgolfiere,
            nombrePlace,
            libelle,
            photo,
            estActive,
            idVol,
            prixVol,
            libelleVol,
            avisVol,
            idParcours, // Utiliser l'ID du parcours existant
            dateDebut,
            dateFin,
            idCouleur,
            nomUtilisateur: utilisateur ? utilisateur.nom_utilisateur : null,
            prenomUtilisateur: utilisateur ? utilisateur.prenom_utilisateur : null
        };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}



async function getAllMontgolfieres() {
    const res = await pool.query(`
    SELECT DISTINCT
    m.id_montgolfiere,
    m.nombre_place,
    m.libelle_montgolfiere,
    m.photo_montgolfiere,
    m.montgolfiere_est_active,
    v.id_vol,
    v.prix_vol,
    v.libelle_vol,
    v.avis_vol,
    p.id_parcours,
    p.libelle_parcours,
    p.distance_parcours,
    p.duree_parcours,
    pl.id_planning,
    pl.date_debut,
    pl.date_fin,
    c.id_couleur,
    c.libelle_couleur,
    u.id_utilisateur,
    u.nom_utilisateur,
    u.prenom_utilisateur
FROM montgolfiere m
LEFT JOIN vol v ON m.id_montgolfiere = v.id_montgolfiere
LEFT JOIN parcours p ON v.id_parcours = p.id_parcours
LEFT JOIN planning pl ON v.id_planning = pl.id_planning
LEFT JOIN est e ON m.id_montgolfiere = e.id_montgolfiere
LEFT JOIN couleur c ON e.id_couleur = c.id_couleur
LEFT JOIN affectationMontgolfiere am ON m.id_montgolfiere = am.id_montgolfiere
LEFT JOIN utilisateur u ON am.id_utilisateur = u.id_utilisateur;
    `);
    return res.rows;
}



async function getMontgolfiereById(id) {
    const res = await pool.query(`
        SELECT 
            m.id_montgolfiere,
            m.nombre_place,
            m.libelle_montgolfiere,
            m.photo_montgolfiere,
            m.montgolfiere_est_active,
            v.id_vol,
            v.prix_vol,
            v.libelle_vol,
            v.avis_vol,
            p.id_parcours,
            p.libelle_parcours,
            p.distance_parcours,
            p.duree_parcours,
            pl.id_planning,
            pl.date_debut,
            pl.date_fin,
            c.id_couleur,
            c.libelle_couleur,
            u.id_utilisateur,
            u.nom_utilisateur,
            u.prenom_utilisateur
        FROM montgolfiere m
        LEFT JOIN vol v ON m.id_montgolfiere = v.id_montgolfiere
        LEFT JOIN parcours p ON v.id_parcours = p.id_parcours
        LEFT JOIN planning pl ON v.id_planning = pl.id_planning
        LEFT JOIN est e ON m.id_montgolfiere = e.id_montgolfiere
        LEFT JOIN couleur c ON e.id_couleur = c.id_couleur
        LEFT JOIN affectationMontgolfiere am ON m.id_montgolfiere = am.id_montgolfiere
        LEFT JOIN utilisateur u ON am.id_utilisateur = u.id_utilisateur
        WHERE m.id_montgolfiere = $1`,
        [id]
    );
    return res.rows[0];
}


async function updateMontgolfiere(id, data, userId, userRole = null) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Vérifier l'autorisation
        const resVerif = await client.query(
            'SELECT id_utilisateur FROM affectationMontgolfiere WHERE id_montgolfiere = $1',
            [id]
        );

        if (resVerif.rowCount === 0 || (resVerif.rows[0].id_utilisateur !== userId && userRole !== 3)) {
            throw new Error("Vous n'êtes pas autorisé à mettre à jour cette montgolfière.");
        }

        const { nombrePlace, libelleMontgolfiere, photo, estActive, idCouleur, prixVol, libelleVol, avisVol, idParcours, dateDebut, dateFin } = data;

        // Mise à jour conditionnelle de la montgolfière
        const resultMontgolfiere = await client.query(
            'UPDATE montgolfiere SET nombre_place = COALESCE($1, nombre_place), libelle_montgolfiere = COALESCE($2, libelle_montgolfiere), photo_montgolfiere = COALESCE($3, photo_montgolfiere), montgolfiere_est_active = COALESCE($4, montgolfiere_est_active) WHERE id_montgolfiere = $5 RETURNING *',
            [nombrePlace, libelleMontgolfiere, photo, estActive, id]
        );

        const updatedMontgolfiere = resultMontgolfiere.rows[0];
        const idMontgolfiere = updatedMontgolfiere.id_montgolfiere;


        // Mise à jour conditionnelle de la couleur
        if (idCouleur !== undefined) {
            await client.query(
                'UPDATE est SET id_couleur = $1 WHERE id_montgolfiere = $2',
                [idCouleur, idMontgolfiere]
            );
        }

        // Récupérer l'ID du planning actuel pour la montgolfière
        if (dateDebut !== undefined || dateFin !== undefined) {
            const resPlanningId = await client.query(
                'SELECT id_planning FROM vol WHERE id_montgolfiere = $1',
                [idMontgolfiere]
            );
            const idPlanning = resPlanningId.rows[0]?.id_planning;

            if (idPlanning) {
                await client.query(
                    'UPDATE planning SET date_debut = COALESCE($1, date_debut), date_fin = COALESCE($2, date_fin) WHERE id_planning = $3',
                    [dateDebut, dateFin, idPlanning]
                );
            }
        }

        // Mise à jour conditionnelle du vol
        if (prixVol !== undefined || libelleVol !== undefined || avisVol !== undefined || idParcours !== undefined) {
            await client.query(
                'UPDATE vol SET prix_vol = COALESCE($1, prix_vol), libelle_vol = COALESCE($2, libelle_vol), avis_vol = COALESCE($3, avis_vol), id_parcours = COALESCE($4, id_parcours) WHERE id_montgolfiere = $5',
                [prixVol, libelleVol, avisVol, idParcours, idMontgolfiere]
            );
        }

        await client.query('COMMIT');
        return "Montgolfière et vol mis à jour avec succès.";
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}






async function deleteMontgolfiere(id, userId, userRole = null) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Vérifier l'autorisation de l'utilisateur pour supprimer la montgolfière
        const resVerif = await client.query(
            'SELECT u.id_utilisateur FROM montgolfiere m ' +
            'JOIN affectationMontgolfiere am ON m.id_montgolfiere = am.id_montgolfiere ' +
            'JOIN utilisateur u ON am.id_utilisateur = u.id_utilisateur ' +
            'WHERE m.id_montgolfiere = $1',
            [id]
        );

        if (resVerif.rowCount === 0 || (resVerif.rows[0].id_utilisateur !== userId && userRole !== 3)) {
            throw new Error("Vous n'êtes pas autorisé à supprimer cette montgolfière.");
        }

        // Supprimer les enregistrements liés dans la table 'est'
        await client.query('DELETE FROM est WHERE id_montgolfiere = $1', [id]);

        // Supprimer les enregistrements liés dans la table 'vol'
        await client.query('DELETE FROM vol WHERE id_montgolfiere = $1', [id]);

        // Supprimer les associations dans 'affectationMontgolfiere'
        await client.query('DELETE FROM affectationMontgolfiere WHERE id_montgolfiere = $1', [id]);

        // Supprimer la montgolfière elle-même
        await client.query('DELETE FROM montgolfiere WHERE id_montgolfiere = $1', [id]);

        await client.query('COMMIT');
        return "Montgolfière supprimée avec succès.";
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

async function getMontgolfiereByUtilisateur(idUtilisateur) {
    const client = await pool.connect();
    try {
        const res = await client.query(`
            SELECT 
                m.id_montgolfiere,
                m.nombre_place,
                m.libelle_montgolfiere,
                m.photo_montgolfiere,
                m.montgolfiere_est_active,
                v.id_vol,
                v.prix_vol,
                v.libelle_vol,
                v.avis_vol,
                p.id_parcours,
                p.libelle_parcours,
                p.distance_parcours,
                p.duree_parcours,
                pl.id_planning,
                pl.date_debut,
                pl.date_fin,
                c.id_couleur,
                c.libelle_couleur
            FROM montgolfiere m
            JOIN affectationMontgolfiere am ON m.id_montgolfiere = am.id_montgolfiere
            LEFT JOIN vol v ON m.id_montgolfiere = v.id_montgolfiere
            LEFT JOIN parcours p ON v.id_parcours = p.id_parcours
            LEFT JOIN planning pl ON v.id_planning = pl.id_planning
            LEFT JOIN est e ON m.id_montgolfiere = e.id_montgolfiere
            LEFT JOIN couleur c ON e.id_couleur = c.id_couleur
            WHERE am.id_utilisateur = $1;
        `, [idUtilisateur]);
        return res.rows;
    } catch (error) {
        console.error('Erreur lors de la récupération des montgolfières pour l\'utilisateur:', error);
        throw error;
    } finally {
        client.release();
    }
}

async function modifierMontgolfiere(id, nombrePlace) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query('UPDATE montgolfiere SET nombre_place = $1 WHERE id_montgolfiere = $2', [nombrePlace, id]);
        await client.query('COMMIT');
        return "Nombre de places de la montgolfière mis à jour avec succès.";
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}


async function updateMontgolfiereActif(id_montgolfiere, montgolfiereData) {
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

module.exports = {
    creerMontgolfiereComplete,
    getAllMontgolfieres,
    getMontgolfiereById,
    updateMontgolfiere,
    deleteMontgolfiere,
    getMontgolfiereByUtilisateur,
    modifierMontgolfiere,
    updateMontgolfiereActif
};