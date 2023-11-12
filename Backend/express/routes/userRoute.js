const express = require("express");
const userRouter = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// Signup route
userRouter.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user to the database
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
    
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).send('Internal Server Error');
  }
});

// Login route
userRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the entered password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // We may generate and send a token for authentication here if needed

    res.json({ message: "Login successful" });

  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = userRouter;
