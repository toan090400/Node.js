const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  try {
    // verify a token
    const token = req.headers.token;
    if (!token) {
      return res.status(404).json({
        message: "Bạn chưa đăng nhập.",
      });
    }
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          message: "Token đã hết hạn.",
        });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.checkAdmin = async (req, res, next) => {
  try {
    this.verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(404).json({
          message: "Bạn không phải là Admin.",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
