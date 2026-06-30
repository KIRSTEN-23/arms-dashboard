const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

const express = require("express");
const cors = require("cors");
const armsRoutes = require("./routes/armsRoutes");

console.log("ARMS_BASE_URL:", process.env.ARMS_BASE_URL);
console.log("ARMS_API_KEY:", process.env.ARMS_API_KEY ? "Loaded" : "Missing");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "ARMS backend is running" });
});

app.use("/api/arms", armsRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`ARMS backend running on port ${PORT}`);
});