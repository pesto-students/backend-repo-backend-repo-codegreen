import express from "express";
import { fetchAddressFromLatitudeAndLongitude } from "../controllers/util.js";
const utilsRouter = express.Router();

utilsRouter.get(
  "/getAddress/:latitude/:longitude",
  fetchAddressFromLatitudeAndLongitude
);

export default utilsRouter;
