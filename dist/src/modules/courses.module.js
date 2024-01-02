"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const coursesSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    price: { type: Number, min: 0, required: true },
});
exports.courseModel = mongoose_1.default.model("Course", coursesSchema);
