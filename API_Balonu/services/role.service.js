const pool = require('../config/db');

async function getRole() {
    try {
        const { rows } = await pool.query("SELECT * FROM role ");
        return rows;
    } catch (error) {
        console.error("Error during getRole",error);
    }
}

async function getRoleByid(id_role) {
    try {
        const { rows } = await pool.query("SELECT * FROM role WHERE id_role = $1", [id_role]);
        return rows[0];
    } catch (error) {
        console.error("Error during getRoleById",error);
    }
}


module.exports = {
    getRole,
    getRoleByid

};
