const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
    const testToken = req.header('Authorization');
    let token = testToken.split(' ')[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!token) {
      return res.status(401).json({ message: "Access Denied" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).json({ message: "invalid token" });
    }
  };
  
  // Middleware pour vérifier les rôles
  const authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.function_employee)) {
        return res.status(403).json({ message: "Access Denied" });
      }
      next();
    };
  };

  module.exports = {
    authenticateJWT,authorizeRoles
  }