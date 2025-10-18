import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Carwash from "../models/Carwash.js";
import passport from "../config/google.strategy.js";

const router = express.Router();

// Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// -------------------- USER SIGNUP --------------------
router.post("/signup/user", async (req, res) => {
  try {
    const { name, email, phone, password, carDetails } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      carDetails,
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      carDetails: user.carDetails,
      token: generateToken(user._id, "customer"),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- USER SIGNIN --------------------
router.post("/signin/user", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      carDetails: user.carDetails,
      token: generateToken(user._id, user.role),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- CARWASH SIGNUP --------------------
router.post("/signup/carwash", async (req, res) => {
  try {
    const { email, name, location, services, workingHours, password } = req.body;

    const exists = await Carwash.findOne({ name });
    if (exists)
      return res.status(400).json({ error: "Carwash already exists" });

    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const carwash = await Carwash.create({
      name,
      email,
      location,
      services,
      workingHours,
      password: hashedPassword,
    });

    res.json({
      _id: carwash._id,
      name: carwash.name,
      email: carwash.email,
      location: carwash.location,
      services: carwash.services,
      token: generateToken(carwash._id, "carwash"),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- CARWASH SIGNIN --------------------
router.post("/signin/carwash", async (req, res) => {
  try {
    const { name, password } = req.body;
    const carwash = await Carwash.findOne({ name });
    if (!carwash) return res.status(400).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, carwash.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    res.json({
      _id: carwash._id,
      name: carwash.name,
      location: carwash.location,
      token: generateToken(carwash._id, "carwash"),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    console.log("Authenticated user:", req.user);
    let existUser = await User.findOne({ email: req.user.email });

    if (!existUser)
      existUser = await User.create({
        name: req.user.fullName,
        email: req.user.email,
        avatar: req.user.avatar,
        role: "customer",
        password: "google-auth",
        phone: "",
      });

    const token = generateToken(existUser._id, existUser.role);
    res.redirect(`http://localhost:3000/sign-in?token=${token}`);
  }  
);

export default router;
