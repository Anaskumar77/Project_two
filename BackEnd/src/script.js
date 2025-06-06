import express from "express";
import cors from "cors";
import { router } from "express";
import AuthRoutes from "./routes/AuthRoutes.js";
const app = express();
app.use(cors());

app.use("/api/auth", authRoutes);
