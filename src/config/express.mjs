import fs from "node:fs";
import http from "node:http";
import { fileURLToPath } from "node:url";
import { join, dirname, resolve } from "node:path";
import cors from "cors";
// import helmet from "helmet";
import "./mongoose.mjs";
import express from "express";
import logger from "morgan";
import { errorHandler } from "#middleware";
import router from "#route";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//SocketIO
const app = express(); // Init Express APP
app.disable("x-powered-by");
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
const server = http.Server(app);
// Set up view engine and layout
// app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(router);
// app.set("views", join(__dirname, "../views"));
// app.use(express.static(join(__dirname, "../views")));
// app.get("*", function (_, res) {
//   res.sendFile(resolve(__dirname, "../../views/main"));
// });

// Error Middleware
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.methodNotAllowed);

export { server, app };
