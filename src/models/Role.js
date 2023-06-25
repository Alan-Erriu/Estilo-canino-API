import { Schema, model } from "mongoose";

const roleSchema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);
export const ROLES = ["cliente", "peluquero", "administrador"];
export default model("Role", roleSchema);
