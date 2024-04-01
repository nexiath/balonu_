const pool = require('../config/db');

async function prestataireExists(req, res, next) {
  const prestataireId = req.params.id;
  try {
    const { rowCount } = await pool.query('SELECT COUNT(*) FROM presta WHERE id_presta = $1', [prestataireId]);
    if (rowCount === 0) {
      return res.status(404).json({ error: 'Prestataire non trouvé' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = prestataireExists;
