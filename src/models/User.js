import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    role: [{ type: Schema.Types.ObjectId, ref: "Role" }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//hash contraseñas
userSchema.statics.encryptPassword = function (password) {
  return new Promise(async (resolve, reject) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      resolve(hashedPassword);
    } catch (error) {
      reject(error);
    }
  });
};
//comparar contraseña hasheada en la base de datos  con la ingresadaa por el usuario
userSchema.statics.comparePassword = function (password, receivedPassword) {
  return bcrypt.compare(password, receivedPassword);
};

export default model("User", userSchema);
