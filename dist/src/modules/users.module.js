"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const citiesSchema = new mongoose_1.default.Schema({
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
const usersSchema = new mongoose_1.default.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatar: { type: String, required: true, default: "/uploads/index.png" },
    shareMode: { type: Boolean, required: true, default: false },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator_1.default.isEmail, "Invalid Email"],
    },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["user", "admin"] },
    REFRESH_TOKEN: { type: String },
    cities: [citiesSchema],
});
exports.userModel = mongoose_1.default.model("User", usersSchema);
