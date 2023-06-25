import Role from "../models/Role.js";

//se crean 3 roles por defecto "cliente", "pelquero" y "administrador".
export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;
    const values = await Promise.all([
      new Role({ name: "cliente" }).save(),
      new Role({ name: "peluquero" }).save(),
      new Role({ name: "administrador" }).save(),
    ]);
    console.log(values);
  } catch (error) {
    console.error(error);
  }
};
