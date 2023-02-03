import { MONGODB_URI } from "./utils/config.js";
import coursesRouter from "./controllers/courses.js";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(`Connecting to ${MONGODB_URI}`);

mongoose.connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Error connecting to MongoDB: ", err.message));


const app = express();
app.use(cors());
app.use("/", express.static(path.join(__dirname, "build")));
app.use(express.json());

// API Routes
app.use("/api/courses", coursesRouter);

// Static Routes
app.get("*", (request, response) => {
  response.sendFile(path.resolve(__dirname, "build", "index.html"));
})

export default app;
