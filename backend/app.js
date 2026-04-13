import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connectDB } from "./src/config/database.js";
import { authRoutes } from "./src/routes/auth.routes.js";
import { taskRoutes } from "./src/routes/task.routes.js";

import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: function(origin, callback){
      // Permitir cualquier localhost temporalmente para desarrollo
      if(!origin || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
        return callback(null, true);
      }
      return callback(new Error('CORS not allowed by origin'), false);
    },
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", taskRoutes);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`servidor corriendo en el puerto ${PORT}`);
});
