import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "User unauthorized" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(401).json({ message: "User unauthorized" });
    }
    req.user = decode;
    next();
  } catch (error) {
    console.log("Error in isAuth middleware", error);
    return res.status(500).json({
      message: "Internal server error in isAuth middleware",
      success: false,
    });
  }
};
