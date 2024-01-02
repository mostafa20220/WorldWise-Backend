"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
// import https from "https";
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cities_router_1 = require("./src/routers/cities.router");
const helpers_1 = require("./src/utils/helpers");
const users_router_1 = require("./src/routers/users.router");
const auth_router_1 = require("./src/routers/auth.router");
const app = (0, express_1.default)();
// const server = https.createServer(options, app);
const server = http_1.default.createServer(app);
// connect mongodb
(function connectMongoose() {
    const uri = process.env.MONGODB_CONNECTION_STRING;
    if (!uri)
        throw new Error("MongoDB Connection String Not Provided");
    mongoose_1.default
        .connect(uri)
        .then((_) => console.log("mongoose is connected successfully"))
        .catch((err) => console.error("Failed to connect to mongoDB, \nError:\n", err));
})();
// Middlewares
app.use("/api/uploads", express_1.default.static(path_1.default.join(__dirname, "uploads")));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({
    origin: "https://worldwide-react-app.onrender.com",
    credentials: true,
}));
// app.use(cors({ credentials: true, origin: "https://localhost:5173" }));
// Routers
app.use("/api/cities", cities_router_1.citiesRouter);
app.use("/api/users", users_router_1.usersRouter);
app.use("/api/auth", auth_router_1.authRouter);
// Handling wrong routers
app.all("*", (req, res, next) => {
    res.status(404).json((0, helpers_1.createRes)("fail", "Resource Not Available"));
    next();
});
// global error handler
app.use((err, req, res, next) => {
    fs_1.default.appendFileSync("errors.log", new Date().toLocaleString() + "\t" + err.message + "\n");
    console.log(`${new Date().toLocaleString()}:=>  ${err}`);
    const code = err.code && err.code >= 100 && err.code < 600 ? err.code : 500;
    res
        .status(code)
        .json((0, helpers_1.createRes)(err.statusText || "error", err.message, code));
});
// lunch the server
const port = process.env.PORT ?? 8080;
server.listen(port, () => {
    console.log("The Server is Listening on port: " + port);
});
