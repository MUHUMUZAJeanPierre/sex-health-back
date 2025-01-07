const MentalHealth = require("../models/MentalHealthModel");

exports.createMentalHealth = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description || !req.file) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newMentalHealth = new MentalHealth({
      title,
      description,
      image: req.file.path,
    });

    const savedMentalHealth = await newMentalHealth.save();

    res.status(201).json({
      message: "MentalHealth entry created successfully.",
      data: savedMentalHealth,
    });
  } catch (error) {
    console.error("Error creating MentalHealth entry:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getAllMentalHealthEntries = async (req, res) => {
  try {
    const entries = await MentalHealth.find();
    res.status(200).json({
      data: entries,
      message: "MentalHealth entries found successfully.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMentalHealthById = async (req, res) => {
  try {
    const entry = await MentalHealth.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: "MentalHealth entry not found." });
    }
    res.status(200).json({
      data: entry,
      message: "MentalHealth entry found successfully.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMentalHealthById = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body; 

    const updatedEntry = await MentalHealth.findByIdAndUpdate(id, updates, {
      new: true, 
      runValidators: true,
    });

    if (!updatedEntry) {
      return res.status(404).json({ message: "MentalHealth entry not found." });
    }

    res.status(200).json({
      message: "MentalHealth entry updated successfully.",
      data: updatedEntry,
    });
  } catch (error) {
    console.error("Error updating MentalHealth entry:", error.message);
    res.status(400).json({ error: error.message });
  }
};

exports.deleteMentalHealthById = async (req, res) => {
  try {
    const deletedEntry = await MentalHealth.findByIdAndDelete(req.params.id);
    if (!deletedEntry) {
      return res.status(404).json({ message: "MentalHealth entry not found." });
    }
    res.status(200).json({
      message: "MentalHealth entry deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
