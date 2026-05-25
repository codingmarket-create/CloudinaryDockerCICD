require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const imageRoutes = require("./routes/imageRoutes");

const app = express();

connectDB();
const allowedOrigins = [
  "http://localhost:5173",
  "https://cloudinary-docker-cicd.vercel.app/",
  "https://cloudinary-frontend-staging.vercel.app",
];


console.log("API URL:", import.meta.env.VITE_API_URL);
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/images", imageRoutes);
app.use("/", (req, res) => {
  res.send("docker build checking");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
