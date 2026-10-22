const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

const express = require("express");
const cors = require("cors");
const armsRoutes = require("./routes/armsRoutes");

const app = express();

const frontendOrigins = [process.env.FRONTEND_URL].filter(Boolean);
if (process.env.FRONTEND_URL) {
  const localFrontend = new URL(process.env.FRONTEND_URL);
  if (["localhost", "127.0.0.1"].includes(localFrontend.hostname)) {
    localFrontend.hostname = localFrontend.hostname === "localhost" ? "127.0.0.1" : "localhost";
    frontendOrigins.push(localFrontend.origin);
  }
}

app.use(
  cors({
    origin: frontendOrigins,
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
