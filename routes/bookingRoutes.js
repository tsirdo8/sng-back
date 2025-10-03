import express from "express";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Carwash from "../models/Carwash.js";

const router = express.Router();

/**
 * CREATE booking
 * Example body:
 * {
 *   "user": "USER_ID",
 *   "carwash": "CARWASH_ID",
 *   "service": "Full Wash",
 *   "date": "2025-10-05",
 *   "time": "14:30"
 * }
 */
router.post("/", async (req, res) => {
  try {
    const { user, carwash } = req.body;

    // check if user and carwash exist
    const existingUser = await User.findById(user);
    const existingCarwash = await Carwash.findById(carwash);

    if (!existingUser || !existingCarwash) {
      return res.status(404).json({ error: "User or Carwash not found" });
    }

    const booking = new Booking(req.body);
    await booking.save();

    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all bookings
router.get("/", async (req, res) => {
  const bookings = await Booking.find()
    .populate("user", "name email phone")
    .populate("carwash", "name location services");
  res.json(bookings);
});

// READ single booking
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user", "name email phone")
      .populate("carwash", "name location");
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE booking (e.g. status, time)
router.put("/:id", async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("user", "name email")
      .populate("carwash", "name location");
    if (!updated) return res.status(404).json({ error: "Booking not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE booking
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Booking not found" });
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
