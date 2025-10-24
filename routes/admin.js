// routes/admin.js
import express from "express";
import User from "../models/User.js";
import Carwash from "../models/Carwash.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/dashboard", protect, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "customer" });
    const totalCarwashes = await Carwash.countDocuments();
    const totalAdmins = await User.countDocuments({ role: "admin" });


    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const newUsers = await User.countDocuments({
      createdAt: { $gte: lastWeek },
    });

    const latestUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email role createdAt");

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalCarwashes,
        totalAdmins,
        newUsers,
      },
      latestUsers,
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
