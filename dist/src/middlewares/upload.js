"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const helpers_1 = require("../utils/helpers");
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "/dist/uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = file.originalname.split('.').pop();
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext);
    },
});
const fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else
        cb(new helpers_1.AppError(400, "fail", `The ${file.fieldname} must be either jpeg or png image`), false);
};
exports.upload = (0, multer_1.default)({ storage, fileFilter });
