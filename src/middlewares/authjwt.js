import dotEnv from "dotenv";
import User from "../models/user";
import Jwt from "jsonwebtoken";

dotEnv.config();

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    const decodeToken = Jwt.verify(token, process.env.SECRET);
    req.userId = decodeToken.id;

    const user = await User.findById(req.userId, { password: 0 });

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    next();
  } catch (error) {
    console.error(error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    res.status(500).json({ message: "Server Error" });
  }
};
