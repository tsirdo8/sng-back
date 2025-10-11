import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import carwashRoutes from "./routes/carwashRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
connectDB().then((res) => {
  // „const PORT = process.env.PORT || 5000;
  app.listen(3000, () => console.log(`Server running on port 3000`));
});

app.use(express.json());

app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Hello from backend!" });
});
app.use("/api/users", userRoutes);
app.use("/api/carwashes", carwashRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});
