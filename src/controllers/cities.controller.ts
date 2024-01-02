import { NextFunction, Response } from "express";
import { AuthRequest, City } from "../types/types";
import { AppError, createRes } from "../utils/helpers";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import { userModel } from "../models/users.model";

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

export const getCity = asyncWrapper(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.payload?.id;
    const cityId = req.params?.cityId;
    const user = await userModel.findOne({ _id: userId });

    if (!user) return next(new AppError(404, "fail", "User Not Found"));

    // console.log("user: ", user);
    // console.log("cityId", cityId);
    // console.log("city._id", user?.cities[0]._id);
    const foundCity = user?.cities.find((city) => city._id == cityId);

    if (foundCity) res.json(createRes("success", { city: foundCity }));
    else next(new AppError(404, "fail", "City Not Found"));
  }
);

export const postCity = asyncWrapper(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.payload?.id;

    // create the new City
    const { cityName, country, emoji, date, notes, position } = req.body;

    const newCity = { cityName, country, emoji, date, notes, position };

    // save the new City to the db
    const user = await userModel.findOne({ _id: userId });

    if (!user) return next(new AppError(404, "fail", "User Not Found"));

    user?.cities.push(newCity);
    await user?.save();

    return res
      .status(201)
      .json(
        createRes("success", { city: user?.cities[user?.cities.length - 1] })
      );
  }
);

export const patchCity = asyncWrapper(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    // get the data
    const userId = req.payload?.id;
    const cityId = req.params?.cityId;
    const { cityName, country, emoji, date, notes, position } = req.body;

    const city: City = {};

    if (
      cityName === undefined &&
      country === undefined &&
      emoji === undefined &&
      date === undefined &&
      notes === undefined &&
      position === undefined
    )
      return next(
        new AppError(
          400,
          "fail",
          "Invalid Request Body, either 'cityName' or 'country' or 'emoji' or 'date' or 'notes' or 'position' field should be provided"
        )
      );

    if (cityName !== undefined) city.cityName = cityName;
    if (country !== undefined) city.country = country;
    if (emoji !== undefined) city.emoji = emoji;
    if (date !== undefined) city.date = date;
    if (notes !== undefined) city.notes = notes;
    if (position !== undefined) city.position = position;

    // apply the change to the database.
    const user = await userModel.findById(userId);
    const cityIndex = user?.cities.findIndex((city) => city._id == cityId);
    if (cityIndex !== undefined) {
      user?.cities.splice(cityIndex, 1, city);
      await user?.save();
      res.json(createRes("success", { city }));
    } else next(new AppError(404, "fail", "City Not Found"));
  }
);

export const deleteCity = asyncWrapper(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.payload?.id;
    const cityId = req.params?.cityId;

    const user = await userModel.findById(userId);
    const cityIndex = user?.cities.findIndex((city) => city._id == cityId);
    if (cityIndex !== undefined) {
      user?.cities.splice(cityIndex, 1);
      await user?.save();
      res.json(createRes("success", { city: "deleted" }));
    } else next(new AppError(404, "fail", "City Not Found"));
  }
);
