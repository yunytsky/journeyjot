import express from "express";
import { getAllJourneys, addJourney, editJourney, deleteJourney, getSingleJourney } from "../controllers/journeys.js";

const router = express.Router();

router.get("/", getAllJourneys);
router.get("/:journeyId", getSingleJourney);

router.post("/", addJourney);

router.patch("/:journeyId", editJourney);

router.delete("/:journeyId", deleteJourney);

export default router;