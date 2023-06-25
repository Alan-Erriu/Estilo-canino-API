import User from "../models/User.js";
import { ROLES } from "../models/Role.js";
//chequea si el usuario ya existe en la base de datos
export const checkExistingUser = async (req, res, next) => {
  try {
    const userFound = await User.findOne({ name: req.body.name });
    if (userFound)
      return res.status(400).json({ message: "The user already exists" });

    const email = await User.findOne({ email: req.body.email });
    if (email)
      return res.status(400).json({ message: "The email already exists" });

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//chequea que el rol exista
export const checkExistingRole = (req, res, next) => {
  if (!req.body.role) return res.status(400).json({ message: "No roles" });

  for (let i = 0; i < req.body.role.length; i++) {
    if (!ROLES.includes(req.body.role[i])) {
      return res.status(400).json({
        message: `Role ${req.body.role[i]} does not exist`,
      });
    }
  }

  next();
};
