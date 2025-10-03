import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  carwash: { type: mongoose.Schema.Types.ObjectId, ref: "Carwash", required: true },
  service: { type: String, required: true }, 
  date: { type: String, required: true },   
  time: { type: String, required: true }, 
  status: { 
    type: String, 
    enum: ["pending", "confirmed", "completed", "cancelled"], 
    default: "pending" 
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Booking", bookingSchema);
