import express from "express";
import Carwash from "../models/Carwash.js";

const router = express.Router();

// CREATE carwash
router.post("/", async (req, res) => {
  try {
    const carwash = new Carwash(req.body);
    await carwash.save();
    res.json(carwash);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all carwashes
router.get("/", async (req, res) => {
  const carwashes = await Carwash.find();
  res.json(carwashes);
});

// READ single carwash
router.get("/:id", async (req, res) => {
  const carwash = await Carwash.findById(req.params.id);
  res.json(carwash);
});

// UPDATE carwash
router.put("/:id", async (req, res) => {
  const updated = await Carwash.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE carwash
router.delete("/:id", async (req, res) => {
  await Carwash.findByIdAndDelete(req.params.id);
  res.json({ message: "Carwash deleted" });
});

export default router;
