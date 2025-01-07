const QuickAction = require("../models/QuickAction");

// Create a new QuickAction
exports.createQuickAction = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description || !req.file) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newQuickAction = new QuickAction({
      title,
      description,
      image: req.file.path,
    });

    const savedQuickAction = await newQuickAction.save();
    res.status(201).json({ message: "QuickAction created successfully.", data: savedQuickAction });
  } catch (error) {
    console.error("Error creating QuickAction:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all QuickActions
exports.getAllQuickActions = async (req, res) => {
  try {
    const actions = await QuickAction.find();
    res.status(200).json({ data: actions, message: "Quick actions found successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single QuickAction by ID
exports.getQuickActionById = async (req, res) => {
  try {
    const action = await QuickAction.findById(req.params.id);
    if (!action) return res.status(404).json({ message: "QuickAction not found." });
    res.status(200).json({ data: action, message: "Quick action found." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a QuickAction by ID
exports.updateQuickActionById = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body; // The fields to update should come from the request body
  
      const updatedAction = await QuickAction.findByIdAndUpdate(id, updates, {
        new: true, // Return the updated document
        runValidators: true, // Ensure updates adhere to schema validations
      });
  
      if (!updatedAction) {
        return res.status(404).json({ message: "QuickAction not found." });
      }
  
      res.status(200).json({ message: "QuickAction updated successfully.", data: updatedAction });
    } catch (error) {
      console.error("Error updating QuickAction:", error.message);
      res.status(400).json({ error: error.message });
    }
  };
  
// Delete a QuickAction by ID
exports.deleteQuickActionById = async (req, res) => {
  try {
    const deletedAction = await QuickAction.findByIdAndDelete(req.params.id);
    if (!deletedAction) return res.status(404).json({ message: "QuickAction not found." });
    res.status(200).json({ message: "QuickAction deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
