const QuickAction = require("../models/QuickAction");
const cloudinary = require('../Utils/cloudinary');
const multer = require("multer");
const fs = require("fs");

// Multer storage setup
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 3000000 } // 3MB
}).single("image");

// Create a new QuickAction
exports.createQuickAction = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { title, description } = req.body;
      const image = req.file.filename;

      if (!title || !description || !req.file) {
        return res.status(400).json({ message: "All fields are required." });
      }

      // Upload the file to Cloudinary
      const cloudinaryResult = await cloudinary.uploader.upload(req.file.path);

      // Create a new QuickAction entry
      const newQuickAction = new QuickAction({
        title,
        description,
        image: cloudinaryResult.secure_url, // Use the Cloudinary URL
      });

      // Save to the database
      const savedQuickAction = await newQuickAction.save();

      // Clean up the local file after uploading
      fs.unlinkSync(req.file.path);

      res.status(201).json({
        message: "QuickAction created successfully.",
        data: savedQuickAction
      });
    } catch (error) {
      console.error("Error creating QuickAction:", error.message);

      // Remove the file if an error occurs
      if (req.file && req.file.path) {
        fs.unlinkSync(req.file.path);
      }

      res.status(500).json({ message: "Internal Server Error" });
    }
  });
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
