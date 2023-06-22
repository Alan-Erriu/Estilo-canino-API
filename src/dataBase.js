import mongoose from "mongoose";
import dotEnv from "dotenv";

dotEnv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    throw new Error("No se puede conectar a la base de datos");
  }
};

export default connect;
