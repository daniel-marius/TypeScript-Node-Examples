const PORT: number = 3000;

import "reflect-metadata";
import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import { createConnection } from "typeorm";

import userRoutes from "./routes/user.routes";

createConnection();

const app: Application = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
