import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import carwashRoutes from "./routes/carwashRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();
connectDB();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/carwashes", carwashRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
