import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true }, 
  carDetails: {
    make: { type: String },  
    model: { type: String },   
    plateNumber: { type: String, unique: true }
  },
  role: { type: String, enum: ["customer", "admin"], default: "customer" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
