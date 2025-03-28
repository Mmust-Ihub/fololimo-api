import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error("authentication credentials missing");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (Date.now() < decoded.expiresAt) {
      req.userId = decoded.userId;
    } else {
      throw new Error("the token provided has expired");
    }
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
