"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCity = exports.patchCity = exports.postCity = exports.getCity = void 0;
const helpers_1 = require("../utils/helpers");
const asyncWrapper_1 = require("../middlewares/asyncWrapper");
const users_module_1 = require("../modules/users.module");
// export const getAllCities = asyncWrapper(
//   async (req: Request, res: Response) => {
//     // paging feature
//     const page = +req.query.page! || 1; // add ! to tell typescript that page is not undefined
//     const limit = +req.query.limit! || 5; // add ! to tell typescript that limit is not undefined
//     const skipAmount = (page - 1) * limit;
//     const data = await cityModel
//       .find({}, { __v: false })
//       .limit(limit)
//       .skip(skipAmount); // using projection to hide __v
//     res.json({ status: "success", date: { cities: data } });
//   }
// );
exports.getCity = (0, asyncWrapper_1.asyncWrapper)(async (req, res, next) => {
    const userId = req.payload?.id;
    const cityId = req.params?.cityId;
    const user = await users_module_1.userModel.findOne({ _id: userId });
    if (!user)
        return next(new helpers_1.AppError(404, "fail", "User Not Found"));
    // console.log("user: ", user);
    // console.log("cityId", cityId);
    // console.log("city._id", user?.cities[0]._id);
    const foundCity = user?.cities.find((city) => city._id == cityId);
    if (foundCity)
        res.json((0, helpers_1.createRes)("success", { city: foundCity }));
    else
        next(new helpers_1.AppError(404, "fail", "City Not Found"));
});
exports.postCity = (0, asyncWrapper_1.asyncWrapper)(async (req, res, next) => {
    const userId = req.payload?.id;
    // create the new City
    const { cityName, country, emoji, date, notes, position } = req.body;
    const newCity = { cityName, country, emoji, date, notes, position };
    // save the new City to the db
    const user = await users_module_1.userModel.findOne({ _id: userId });
    if (!user)
        return next(new helpers_1.AppError(404, "fail", "User Not Found"));
    user?.cities.push(newCity);
    await user?.save();
    return res
        .status(201)
        .json((0, helpers_1.createRes)("success", { city: user?.cities[user?.cities.length - 1] }));
});
exports.patchCity = (0, asyncWrapper_1.asyncWrapper)(async (req, res, next) => {
    // get the data
    const userId = req.payload?.id;
    const cityId = req.params?.cityId;
    const { cityName, country, emoji, date, notes, position } = req.body;
    const city = {};
    if (cityName === undefined &&
        country === undefined &&
        emoji === undefined &&
        date === undefined &&
        notes === undefined &&
        position === undefined)
        return next(new helpers_1.AppError(400, "fail", "Invalid Request Body, either 'cityName' or 'country' or 'emoji' or 'date' or 'notes' or 'position' field should be provided"));
    if (cityName !== undefined)
        city.cityName = cityName;
    if (country !== undefined)
        city.country = country;
    if (emoji !== undefined)
        city.emoji = emoji;
    if (date !== undefined)
        city.date = date;
    if (notes !== undefined)
        city.notes = notes;
    if (position !== undefined)
        city.position = position;
    // apply the change to the database.
    const user = await users_module_1.userModel.findById(userId);
    const cityIndex = user?.cities.findIndex((city) => city._id == cityId);
    if (cityIndex !== undefined) {
        user?.cities.splice(cityIndex, 1, city);
        await user?.save();
        res.json((0, helpers_1.createRes)("success", { city }));
    }
    else
        next(new helpers_1.AppError(404, "fail", "City Not Found"));
});
exports.deleteCity = (0, asyncWrapper_1.asyncWrapper)(async (req, res, next) => {
    const userId = req.payload?.id;
    const cityId = req.params?.cityId;
    const user = await users_module_1.userModel.findById(userId);
    const cityIndex = user?.cities.findIndex((city) => city._id == cityId);
    if (cityIndex !== undefined) {
        user?.cities.splice(cityIndex, 1);
        await user?.save();
        res.json((0, helpers_1.createRes)("success", { city: "deleted" }));
    }
    else
        next(new helpers_1.AppError(404, "fail", "City Not Found"));
});
