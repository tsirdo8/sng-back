import mongoose from "mongoose";

const carwashSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    address: { type: String, required: true },
    lat: { type: Number },  
    lng: { type: Number }
  },
  services: [
    {
      name: { type: String, required: true },  
      price: { type: Number, required: true },
      duration: { type: Number } 
    }
  ],
  workingHours: {
    open: { type: String, default: "09:00" },
    close: { type: String, default: "20:00" }
  },
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Carwash", carwashSchema);
