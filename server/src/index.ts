import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";
import searchRoutes from "./routes/searchRoutes";
// Configurations

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
helmet.crossOriginResourcePolicy({ policy: "cross-origin" });
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes

app.get("/", (req, res) => {
  res.send("This is home route");
});

app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/search", searchRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Your server is running on port ${port}`);
});
