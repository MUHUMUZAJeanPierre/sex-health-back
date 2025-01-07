const express = require("express");
const multer = require("multer");
const {createEvent, deleteEventById, getAllEvents, updateEventById, getEventById} = require("../controllers/EventController");
const upload = require('../config/Multer')
const EventRouter = express.Router();

// Routes
EventRouter.post("/action", upload.single("image"), createEvent);
EventRouter.get("/action", getAllEvents);
EventRouter.get("/action/:id",getEventById);
EventRouter.put("/action/:id", updateEventById);
EventRouter.delete("/action/:id", deleteEventById);

module.exports = EventRouter;
