import express from "express";
import cors from "cors";
import AuthRoutes from "./routes/AuthRoutes.js";
import { app, server } from "./socket.js";
import path from "path";
import fs from "fs/promises";

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("/hello anas");
});
app.use("/api/auth", AuthRoutes);

const generateTree = async (directory) => {
  try {
    await fs.access(directory);
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.mkdir(directory, { recursive: true });
    } else {
      throw err;
    }
  }
  const tree = {};
  const entries = await fs.readdir(directory);
  console.log(entries);

  for (const entry of entries) {
    const fullPath = path.join(directory, entry);
    const stat = await fs.stat(fullPath);

    if (stat.isDirectory()) {
      tree[entry] = await generateTree(fullPath); // Recurse into subfolder
      console.log(tree);
    } else {
      tree[entry] = null; // It's a file
    }
  }

  return tree;
};

// GET /files route
app.get("/files", async (req, res) => {
  try {
    const fileTree = await generateTree("users"); // relative to project root
    res.json(fileTree);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

server.listen(9000, () => {
  console.log("app started to listen");
});
