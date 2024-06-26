const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']; 
  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.userId = decoded.id_utilisateur; 
    next();
  });
};


const checkStandCreationPermission = (req, res, next) => {
  const userRole = req.userRole; 
  if (userRole == 1 || userRole == 3 || userRole==2) {
    next(); 
  } else {
    res.status(403).json({ message: 'Access denied' }); 
  }
};




module.exports = { verifyToken,checkStandCreationPermission };
