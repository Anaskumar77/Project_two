import express from "express";
import cors from "cors";
import AuthRoutes from "./routes/AuthRoutes.js";
import { app, server } from "./socket.js";

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("peee pee");
});
app.use("/api/auth", AuthRoutes);

server.listen(3000, () => {
  console.log("app started to listen");
});
