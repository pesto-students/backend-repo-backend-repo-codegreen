import express from "express";
import {
  fetchPlantationMilestones,
  createNewPlantation,
  fetchAllPlantations,
  updatePlantation,
} from "../controllers/plantation.js";
const plantationRouter = express.Router();
plantationRouter.put("/updatePlantation/:id", updatePlantation);
plantationRouter.post("/createNewPlantation", createNewPlantation);
plantationRouter.get("/milestones", fetchPlantationMilestones);
plantationRouter.get("/", fetchAllPlantations);

export default plantationRouter;
