const jwt = require('jsonwebtoken')

function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
  
      if (!token) return res.status(401).json({message: 'the is no token in the header'}); 
  
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.status(403).json({message: 'access denied'}); 
  
        const userRole = decoded.role;
        if (allowedRoles.includes(userRole)) {
          req.user = decoded; 
          next();
        } else {
          res.status(403).json({message: 'access denied'});
        }
      });
    };
  }

  module.exports= authorizeRoles