const express = require("express");
const multer = require("multer");
const {createEvent, deleteEventById, getAllEvents, updateEventById, getEventById} = require("../controllers/EventController");
const upload = require('../config/Multer')
const EventRouter = express.Router();

// Routes
EventRouter.post("/event", upload.single("image"), createEvent);
EventRouter.get("/event", getAllEvents);
EventRouter.get("/event/:id",getEventById);
EventRouter.put("/event/:id", updateEventById);
EventRouter.delete("/event/:id", deleteEventById);

module.exports = EventRouter;
