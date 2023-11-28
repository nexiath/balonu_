const pool = require('../config/db');

async function getSontCouleurs() {
    try {
        const {rows} = await pool.query("SELECT * FROM est");
        return rows;
    } catch (error) {
        console.error("Error during getEst :", error);
        throw error;
    }
 
}

async function getEstForMontgolfiere(id_montgolfiere) {
    try {
        const {rows} = await pool.query("SELECT * FROM est WHERE id_montgolfiere = $1", [id_montgolfiere]);
        return rows;
    } catch (error) {
        console.error("Error during getEstForMontgolfière");
        throw error;
    }
}


async function getEstForCouleur(id_couleur) {
    try {
        const {rows}= await pool.query("SELECT * FROM est WHERE id_couleur = $1", [id_couleur]);
        return rows;
    } catch (error) {
        console.error("Error during getEstForCouleur");
        throw error;
    }
    
}

/* pas sur de l'utilité
async function getEstForMontgolfiereInCouleur(id_montgolfiere, id_couleur) {
    try {
        const {rows}= await pool.query("SELECT * FROM est WHERE id_montgolfiere = $1 AND id_couleur = $2", [id_montgolfiere, id_couleur]);
        return rows;
    } catch (error) {
        console.error("Error during getEstForMontgolfiereInCouleur");
        throw error;

    }

}

 */

async function createEst(id_montgolfiere, id_couleur) {
    try {
        const result = await pool.query("INSERT INTO est (id_montgolfiere, id_couleur) VALUES ($1, $2) RETURNING *", [id_montgolfiere, id_couleur]);
        return result.rows[0];
    } catch (error) {
        console.error("Error during est creation:", error);
        throw error;
    }
}
// Supprimer une association entre montgolfiere et couleur
function deleteEst(id_montgolfiere, id_couleur) {
    return pool.query("DELETE FROM est WHERE id_montgolfiere = ? AND id_couleur = ?", [id_montgolfiere, id_couleur]);
}

module.exports = {
    getSontCouleurs,
    getEstForMontgolfiere,
    getEstForCouleur,
    //getEstForMontgolfiereInCouleur,
    createEst,
    deleteEst
};
