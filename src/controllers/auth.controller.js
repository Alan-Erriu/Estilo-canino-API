import User from "../models/user";
import jwt from "jsonwebtoken";
import dotEnv from "dotenv";
import Role from "../models/role";

dotEnv.config();
//registrarse y obtener token
export const signUp = async (req, res) => {
  try {
    const { name, email, password, age, role } = req.body;
    const newUser = new User({
      name: name,
      email: email,
      password: await User.encryptPassword(password),
      age: age,
    });
    if (role) {
      const foundRoles = await Role.find({ name: { $in: role } });
      newUser.role = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "cliente" });
      newUser.role = [role._id];
    }
    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser._id }, process.env.SECRET, {
      expiresIn: 86400,
    });

    console.log(newUser);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
};

//iniciar sesión, obtener token y comprobar rol

export const signIn = async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email }).populate(
      "role"
    );

    if (!userFound)
      return res.status(400).json({ message: "No se encontró el usuario" });

    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchPassword) {
      return res.status(401).json({
        token: null,
        message: "Contraseña incorrecta",
      });
    }

    const token = jwt.sign({ id: userFound._id }, process.env.SECRET, {
      expiresIn: 86400, // 24 horas
    });

    res.json({ token });
    console.log(matchPassword);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
