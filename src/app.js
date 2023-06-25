import express from "express";
import morgan from "morgan";
import turnRoutes from "./routes/turn.routes";
import authRoutes from "./routes/auth.routes";
import dogRoutes from "./routes/dog.routes";
import { createRoles } from "./libs/initialSetup";
import userRoutes from "./routes/user.routes";
import cors from "cors";
const app = express();
const options = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
    "Authorization",
  ],
  credentials: true,
  origin: "*",
  preflightContinue: false,
};
app.use(cors(options));
// se crean los roles en la base de datos al inciar la aplicacion
createRoles();
app.use(morgan("dev"));
app.use(express.json());
app.get("/", (req, res) => {
  res.json("welcolme to Estilo Canino");
});

app.use("/turn", turnRoutes);
app.use("/auth", authRoutes);
app.use("/dog", dogRoutes);
app.use("/user", userRoutes);

export default app;
