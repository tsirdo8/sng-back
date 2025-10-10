import express from "express";
import Carwash from "../models/Carwash.js";

const router = express.Router();


// READ all carwashes
router.get("/", async (req, res) => {
  try {
    const carwashes = await Carwash.find();
    res.json(carwashes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ single carwash
router.get("/:id", async (req, res) => {
  try {
    const carwash = await Carwash.findById(req.params.id);
    if (!carwash) return res.status(404).json({ error: "Carwash not found" });
    res.json(carwash);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE carwash
router.put("/:id", async (req, res) => {
  try {
    const updated = await Carwash.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Carwash not found" });
    res.json({ message: "Carwash updated successfully", data: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE carwash
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Carwash.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Carwash not found" });
    res.json({ message: "Carwash deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
