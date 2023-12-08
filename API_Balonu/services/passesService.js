const pool = require('../config/db');

const getPasses = async () => {
    const result = await pool.query('SELECT * FROM Passes');
    return result.rows;
};

const addPass = async (pass) => {
    const { type, price, description } = pass;
    await pool.query('INSERT INTO Passes (type, price, description) VALUES ($1, $2, $3)', [type, price, description]);
};

module.exports = {
    getPasses,
    addPass
};
