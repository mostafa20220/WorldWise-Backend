"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesRouter = void 0;
const express_1 = __importDefault(require("express"));
const validator = __importStar(require("../validators/courses.validators"));
const controller = __importStar(require("../controllers/courses.controller"));
const allowTo_1 = require("../middlewares/allowTo");
exports.coursesRouter = express_1.default.Router();
exports.coursesRouter
    .route("/")
    .get(validator.getAllCourses, controller.getAllCourses)
    .post((0, allowTo_1.allowTo)("admin", "manager"), validator.postCourse, controller.postCourse);
exports.coursesRouter
    .route("/:courseId")
    .get(validator.getCourse, controller.getCourse)
    .put((0, allowTo_1.allowTo)("admin", "manager"), validator.putCourse, controller.putCourse)
    .patch((0, allowTo_1.allowTo)("admin", "manager"), validator.patchCourse, controller.patchCourse)
    .delete((0, allowTo_1.allowTo)("admin", "manager"), validator.deleteCourse, controller.deleteCourse);
