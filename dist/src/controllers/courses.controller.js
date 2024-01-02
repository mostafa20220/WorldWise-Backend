"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.putCourse = exports.patchCourse = exports.postCourse = exports.getCourse = exports.getAllCourses = void 0;
const courses_module_1 = require("../modules/courses.module");
const helpers_1 = require("../utils/helpers");
const asyncWrapper_1 = require("../middlewares/asyncWrapper");
exports.getAllCourses = (0, asyncWrapper_1.asyncWrapper)(async (req, res) => {
    // paging feature
    const page = +req.query.page || 1; // add ! to tell typescript that page is not undefined
    const limit = +req.query.limit || 5; // add ! to tell typescript that limit is not undefined
    const skipAmount = (page - 1) * limit;
    const data = await courses_module_1.courseModel
        .find({}, { __v: false })
        .limit(limit)
        .skip(skipAmount); // using projection to hide __v
    res.json({ status: "success", date: { courses: data } });
});
exports.getCourse = (0, asyncWrapper_1.asyncWrapper)(async (req, res, next) => {
    const courseId = req.params?.courseId;
    const courses = await courses_module_1.courseModel.find({ _id: courseId });
    if (courses.length)
        res.json((0, helpers_1.createRes)("success", { course: courses[0] }));
    else
        next(new helpers_1.AppError(404, "fail", "Course Not Found"));
});
exports.postCourse = (0, asyncWrapper_1.asyncWrapper)(async (req, res) => {
    // create the new course
    const { name, price } = req.body;
    const newCourse = { name, price: +price };
    // save the new course to the db
    const addedCourse = new courses_module_1.courseModel(newCourse);
    await addedCourse.save();
    return res.status(201).json((0, helpers_1.createRes)("success", { course: addedCourse }));
});
exports.patchCourse = (0, asyncWrapper_1.asyncWrapper)(async (req, res, next) => {
    // get the data
    const courseId = req.params?.courseId;
    const { name, price } = req.body;
    const course = {};
    if (name === undefined && price === undefined)
        next(new helpers_1.AppError(400, "fail", "Invalid Request Body, either 'name' or 'price' field should be provided"));
    if (name !== undefined)
        course.name = name;
    if (price !== undefined)
        course.price = +price;
    // apply the change to the database.
    const dbRes = await courses_module_1.courseModel.updateOne({ _id: courseId }, course);
    if (!dbRes.matchedCount)
        next(new helpers_1.AppError(500, "error", "course not found in db"));
    else
        res.json((0, helpers_1.createRes)("success", { course }));
});
exports.putCourse = (0, asyncWrapper_1.asyncWrapper)(async (req, res, next) => {
    const courseId = req.params?.courseId;
    const { name, price } = req.body;
    const course = { name, price: +price };
    const dbRes = await courses_module_1.courseModel.updateOne({ _id: courseId }, course);
    if (!dbRes.matchedCount)
        next(new helpers_1.AppError(500, "error", "Course Not Found in DB"));
    else
        res.json((0, helpers_1.createRes)("success", { course }));
});
exports.deleteCourse = (0, asyncWrapper_1.asyncWrapper)(async (req, res, next) => {
    const courseId = req.params?.courseId;
    const dbRes = await courses_module_1.courseModel.deleteOne({ _id: courseId });
    if (!dbRes.deletedCount)
        next(new helpers_1.AppError(400, "fail", "Course Not Found"));
    else
        res.status(200).json((0, helpers_1.createRes)("success", dbRes));
});
