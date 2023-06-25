import dotEnv from "dotenv";
import User from "../models/User.js";
import Jwt from "jsonwebtoken";
import Role from "../models/Role";

dotEnv.config();

// chequea el token, extrae el usrId y lo guarda en req.userId
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.get("Authorization");

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

export const isPeluquero = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.role } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "peluquero") {
        next();
        return;
      }
    }
    return res.status(403).json({ message: "Require Peluquero Role!" });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

export const isAdministrador = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.role } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "administrador") {
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Require Administrador Role!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};
