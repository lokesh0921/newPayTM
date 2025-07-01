const JWT_SECRET = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .send({ message: "Authorization header is missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    //just for checking
    console.log(
      "middleware: decoded: ",
      decoded,
      "decoded.userId: ",
      decoded.userId,
      "req.userId: ",
      req.userId
    );
    // delete after chencking

    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else {
      return res.status(401).json({ message: "Cant get decoded.userId" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { authMiddleware };
