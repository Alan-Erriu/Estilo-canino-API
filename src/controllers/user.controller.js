import User from "../models/User.js";
import Role from "../models/Role.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, age, role } = req.body;

    const rolesFound = await Role.find({ name: { $in: role } });

    const user = new User({
      name,
      email,
      password,
      age,
      role: rolesFound.map((role) => role._id),
    });

    user.password = await User.encryptPassword(user.password);

    const savedUser = await user.save();

    return res.status(200).json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      age: savedUser.age,
      role: savedUser.role,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating user" });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate("role", ["name", "id"])
      .select("-password");

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving users" });
  }
};

export const getUserById = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).populate("role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving user" });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.body;

    // Verificar si el userId es igual al id que se está intentando eliminar
    if (userId === id) {
      return res
        .status(403)
        .json({ message: "You can't delete your own account" });
    }

    const deletedUser = await User.deleteOne({ _id: id });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting user" });
  }
};

//Actualizar los datos del usuario.
export const updateUserById = async (req, res) => {
  const userId = req.userId;
  const { name, email, age, password } = req.body;

  try {
    // Buscar el usuario por su ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Actualizar los campos necesarios, de no proporcionarse algun campo, se conservan los anteriores
    user.name = name || user.name;
    user.email = email || user.email;
    user.age = age || user.age;

    if (password) {
      // Si se proporciona una nueva contraseña, se debe hashear antes de guardarla
      const hashedPassword = await User.encryptPassword(password);
      user.password = hashedPassword;
    }

    // Guardar los cambios en la base de datos
    const updatedUser = await user.save();

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating user" });
  }
};
