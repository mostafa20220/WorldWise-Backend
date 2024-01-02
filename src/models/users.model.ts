import mongoose from "mongoose";
import validator from "validator";

const citiesSchema = new mongoose.Schema({
  cityName: { type: String, required: true },
  country: { type: String, required: true },
  emoji: { type: String, required: true },
  date: { type: String, required: true },
  notes: { type: String, required: false },
  position: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
});

const usersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  avatar: { type: String, required: true, default: "/uploads/index.png" },
  shareMode: { type: Boolean, required: true, default: false },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Invalid Email"],
  },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["user", "admin"] },
  REFRESH_TOKEN: { type: String },
  cities: [citiesSchema],

});

export const userModel = mongoose.model("User", usersSchema);
