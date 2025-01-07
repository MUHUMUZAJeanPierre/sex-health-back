const express = require("express");
const multer = require("multer");
const {createMentalHealth, getAllMentalHealthEntries, getMentalHealthById, updateMentalHealthById, deleteMentalHealthById} = require("../controllers/MentalHealthController");
const upload = require('../config/Multer')
const MentalHealthRouter = express.Router();

// Routes
MentalHealthRouter.post("/health",  createMentalHealth);
MentalHealthRouter.get("/health", getAllMentalHealthEntries);
MentalHealthRouter.get("/health/:id",getMentalHealthById);
MentalHealthRouter.put("/health/:id", updateMentalHealthById);
MentalHealthRouter.delete("/health/:id", deleteMentalHealthById);

module.exports = MentalHealthRouter;
