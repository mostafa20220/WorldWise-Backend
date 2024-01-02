"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenDurationToString = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload, tokenType = "access") => {
    const duration = tokenType === "access"
        ? process.env.JWT_EXPIRES_IN
        : process.env.JWT_REFRESH_EXPIRES_IN;
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: duration,
    });
    return token;
};
exports.generateToken = generateToken;
const tokenDurationToString = (tokenType) => {
    const duration = tokenType === "access"
        ? process.env.JWT_EXPIRES_IN
        : process.env.JWT_REFRESH_EXPIRES_IN;
    if (!duration)
        throw new Error("duration is undefined, JWT_EXPIRES_IN is not set in .env file");
    const year = duration.match(/(\d+)y/) || [0, 0];
    const week = duration.match(/(\d+)w/) || [0, 0];
    const day = duration.match(/(\d+)d/) || [0, 0];
    const hour = duration.match(/(\d+)h/) || [0, 0];
    const minute = duration.match(/(\d+)m/) || [0, 0];
    const second = duration.match(/(\d+)s/) || [0, 0];
    const yearsInSeconds = parseInt(year[1]) * 365 * 24 * 60 * 60;
    const weeksInSeconds = parseInt(week[1]) * 7 * 24 * 60 * 60;
    const daysInSeconds = parseInt(day[1]) * 24 * 60 * 60;
    const hoursInSeconds = parseInt(hour[1]) * 60 * 60;
    const minutesInSeconds = parseInt(minute[1]) * 60;
    const seconds = parseInt(second[1]);
    return (yearsInSeconds +
        weeksInSeconds +
        daysInSeconds +
        hoursInSeconds +
        minutesInSeconds +
        seconds);
};
exports.tokenDurationToString = tokenDurationToString;
