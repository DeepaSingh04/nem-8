const express = require("express");
const Profile = require("../models/profileModel");
const User = require("../models/userModel");
const router = express.Router();

// Add a profile
router.post("/add-profile", async (req, res) => {
  try {
    const { bio, socialMediaLinks, user } = req.body;
    
    // Check if user exists
    const existingUser = await User.findById(user);
    if (!existingUser) return res.status(404).json({ error: "User not found" });

    // Check if user already has a profile
    const existingProfile = await Profile.findOne({ user });
    if (existingProfile) return res.status(400).json({ error: "Profile already exists for this user" });

    const newProfile = new Profile({ bio, socialMediaLinks, user });
    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all profiles with user details
router.get("/profiles", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", "name email");
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
