const pool = require('../config/db');

async function creerPlanning(dateDebut, dateFin) {
    const res = await pool.query(
        'INSERT INTO planning (date_debut, date_fin) VALUES ($1, $2) RETURNING *',
        [dateDebut, dateFin]
    );
    return res.rows[0];
}

async function obtenirPlanning(id) {
    const res = await pool.query('SELECT planning.id_planning, planning.date_debut, planning.date_fin,  vol.libelle_vol, montgolfiere.libelle_montgolfiere FROM planning LEFT JOIN vol ON planning.id_vol = vol.id_vol LEFT JOIN montgolfiere ON planning.id_montgolfiere = montgolfiere.id_montgolfiere WHERE planning.id_planning = $1;', [id]);
    return res.rows[0];
}

// Mettre à jour un planning
async function mettreAJourPlanning(id, dateDebut, dateFin) {
    const res = await pool.query(
        'UPDATE planning SET date_debut = $1, date_fin = $2 WHERE id_planning = $3 RETURNING *',
        [dateDebut, dateFin, id]
    );
    return res.rows[0];
}

// Supprimer un planning
async function supprimerPlanning(id) {
    await pool.query('DELETE FROM planning WHERE id_planning = $1', [id]);
}

async function getPlanningForWeek(dateDebutSemaine) {
    const dateFinSemaine = new Date(dateDebutSemaine);
    dateFinSemaine.setDate(dateDebutSemaine.getDate() + 7);

    const res = await pool.query(`
        SELECT
            pl.id_planning,
            pl.date_debut,
            pl.date_fin,
            m.id_montgolfiere,
            m.libelle_montgolfiere,
            m.photo_montgolfiere,
            m.montgolfiere_est_active,
            v.id_vol,
            v.prix_vol,
            v.libelle_vol,
            v.avis_vol
        FROM planning pl
        JOIN vol v ON pl.id_planning = v.id_planning
        JOIN montgolfiere m ON v.id_montgolfiere = m.id_montgolfiere
        WHERE pl.date_debut >= $1 AND pl.date_fin < $2;
    `, [dateDebutSemaine.toISOString(), dateFinSemaine.toISOString()]);

    return res.rows.map(planning => {
        return {
            ...planning,
            date_debut: new Date(planning.date_debut).toLocaleString(),
            date_fin: new Date(planning.date_fin).toLocaleString()
        };
    });
}


module.exports = {
    creerPlanning,
    obtenirPlanning,
    mettreAJourPlanning,
    supprimerPlanning,
    getPlanningForWeek
};
