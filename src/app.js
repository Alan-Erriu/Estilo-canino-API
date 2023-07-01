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
  origin: ["https://estilocanino.netlify.app", "http://localhost:5173"],
  preflightContinue: false,
};

app.use(cors(options));

// Se crean los roles en la base de datos al iniciar la aplicación
createRoles();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Welcome to Estilo Canino");
});

app.use("/turn", turnRoutes);
app.use("/auth", authRoutes);
app.use("/dog", dogRoutes);
app.use("/user", userRoutes);

export default app;
