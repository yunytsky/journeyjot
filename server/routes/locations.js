import express from "express";
import { getAllLocations } from "../controllers/locations.js";

const router = express.Router();

router.get("/", getAllLocations);

export default router;