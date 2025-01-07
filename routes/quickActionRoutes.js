const express = require("express");
const multer = require("multer");
const quickActionController = require("../controllers/QuickController");
const upload = require('../config/Multer')
const router = express.Router();

// Routes
router.post("/action", upload.single("image"), quickActionController.createQuickAction);
router.get("/action", quickActionController.getAllQuickActions);
router.get("/action/:id", quickActionController.getQuickActionById);
router.put("/action/:id", quickActionController.updateQuickActionById);
router.delete("/action/:id", quickActionController.deleteQuickActionById);

module.exports = router;
