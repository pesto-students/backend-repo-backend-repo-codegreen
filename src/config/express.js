import express from "express";
import http from "http";
import cors from "cors";
import mainRouter from "../routes/index.js";
import fileUpload from "express-fileupload";
import {
  errorHandlingMiddleware,
  requestLoggerMiddleware,
} from "../middlewares/logger.js";
import { attachTokenToReq } from "../services/token.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());
app.use(attachTokenToReq);
app.use(requestLoggerMiddleware);
app.use("/api", mainRouter);
app.use(errorHandlingMiddleware);
const server = http.createServer(app);

export default server;
