const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const armsRoutes = require("./routes/armsRoutes");

dotenv.config();

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