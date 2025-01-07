const express = require("express");
const multer = require("multer");
const {createMentalHealth, getAllMentalHealthEntries, getMentalHealthById, updateMentalHealthById, deleteMentalHealthById} = require("../controllers/MentalHealthController");
const upload = require('../config/Multer')
const MentalHealthRouter = express.Router();

// Routes
MentalHealthRouter.post("/action", upload.single("image"), createMentalHealth);
MentalHealthRouter.get("/action", getAllMentalHealthEntries);
MentalHealthRouter.get("/action/:id",getMentalHealthById);
MentalHealthRouter.put("/action/:id", updateMentalHealthById);
MentalHealthRouter.delete("/action/:id", deleteMentalHealthById);

module.exports = MentalHealthRouter;
