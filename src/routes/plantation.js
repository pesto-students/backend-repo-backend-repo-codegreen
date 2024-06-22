import express from "express";
import {
  fetchPlantationMilestones,
  createNewPlantation,
  fetchAllPlantations,
  updatePlantation,
} from "../controllers/plantation.js";
const plantationRouter = express.Router();

plantationRouter.post("/createNewPlantation", createNewPlantation);
plantationRouter.get("/milestones", fetchPlantationMilestones);
plantationRouter.get("/", fetchAllPlantations);
plantationRouter.put("/updatePlantation/:id", updatePlantation);

export default plantationRouter;
