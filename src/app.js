import express from "express";
import morgan from "morgan";
import turnsRoutes from "./routes/turns.routes";
import authRoutes from "./routes/auth.routes";
import { createRoles } from "./libs/initialSetup";
const app = express();

// se crean los roles en la base de datos al inciar la aplicacion
createRoles();
app.use(morgan("dev"));
app.use(express.json());
app.get("/", (req, res) => {
  res.json("welcolme to Estilo Canino");
});

app.use("/turns", turnsRoutes);
app.use("/auth", authRoutes);

export default app;
