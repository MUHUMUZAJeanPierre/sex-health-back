const Event = require("../models/EventModel"); // Import the Event model

// Create a new Event
exports.createEvent = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description || !req.file) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newEvent = new Event({
      title,
      description,
      image: req.file.path, // Save the image path
    });

    const savedEvent = await newEvent.save();

    res.status(201).json({
      message: "Event created successfully.",
      data: savedEvent,
    });
  } catch (error) {
    console.error("Error creating event:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Get all Events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({
      data: events,
      message: "Events found successfully.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }
    res.status(200).json({
      data: event,
      message: "Event found successfully.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an Event by ID
exports.updateEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body; // Fields to update should come from the request body

    const updatedEvent = await Event.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true, // Ensure updates follow schema validations
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found." });
    }

    res.status(200).json({
      message: "Event updated successfully.",
      data: updatedEvent,
    });
  } catch (error) {
    console.error("Error updating event:", error.message);
    res.status(400).json({ error: error.message });
  }
};

// Delete an Event by ID
exports.deleteEventById = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found." });
    }
    res.status(200).json({
      message: "Event deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
