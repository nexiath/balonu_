const pool = require('../config/db');

async function createReservationDate(date_reservation) {
    try {
        const { rows } = await pool.query('INSERT INTO dater (date_reservation) VALUES ($1) RETURNING *', [date_reservation]);
        return rows[0];
    } catch (error) {
        console.error('Error during createReservationDate', error);
        throw error;
    }
}

async function getAllReservationDates() {
    try {
        const { rows } = await pool.query('SELECT * FROM dater');
        return rows;
    } catch (error) {
        console.error('Error during getAllReservationDates', error);
        throw error;
    }
}

async function getReservationDateById(id) {
    try {
        const { rows } = await pool.query('SELECT * FROM dater WHERE id_date_reservation = $1', [id]);
        return rows[0];
    } catch (error) {
        console.error('Error during getReservationDateById', error);
        throw error;
    }
}

async function updateReservationDate(id, date_reservation) {
    try {
        const { rows } = await pool.query('UPDATE dater SET date_reservation = $1 WHERE id_date_reservation = $2 RETURNING *', [date_reservation, id]);
        return rows[0];
    } catch (error) {
        console.error('Error during updateReservationDate', error);
        throw error;
    }
}

async function deleteReservationDate(id) {
    try {
        const { rows } = await pool.query('DELETE FROM dater WHERE id_date_reservation = $1 RETURNING *', [id]);
        return rows[0];
    } catch (error) {
        console.error('Error during deleteReservationDate', error);
        throw error;
    }
}

module.exports = {
    createReservationDate,
    getAllReservationDates,
    getReservationDateById,
    updateReservationDate,
    deleteReservationDate
};
