const express = require("express");
const Post = require("../models/postModel");
const User = require("../models/userModel");
const router = express.Router();

// Add a new post
router.post("/add-post", async (req, res) => {
  try {
    const { title, content, author } = req.body;

    // Check if user exists
    const existingUser = await User.findById(author);
    if (!existingUser) return res.status(404).json({ error: "User not found" });

    const newPost = new Post({ title, content, author });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all posts with author details
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
