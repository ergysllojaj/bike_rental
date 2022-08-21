const jwt = require("jsonwebtoken");

module.exports.isAuthAs = (roles) => {
  return (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }
    token = token.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid token",
        });
      }
      if (roles.includes(decoded.role)) {
        res.userId = decoded.id;
        next();
      } else {
        return res.status(401).json({
          message: "You don't have permission to do this action",
        });
      }
    });
    // next();
  };
};
