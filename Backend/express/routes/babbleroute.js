const express = require("express");
const recordRoutes = express.Router();

const Babble = require("../models/babbleModel");

// Get all records
recordRoutes.route("/babbleroute").get(async function (req, res) {
    try {
      const result = await Babble.find({});
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Get a single record by id
  recordRoutes.route("/babbleroute/:id").get(async function (req, res) {
    try {
      const result = await Babble.findById(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Create a new record
  recordRoutes.route("/babbleroute/add").post(async function (req, res) {
    try {
      const { id, user, file, language, srt, txt } = req.body;
      const newRecord = new Babble({ id, user, file, language, srt, txt });
      await newRecord.save();
      res.status(201).json(newRecord);
      console.log("Added");
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Update a record by id
  recordRoutes.route("/update/:id").post(async function (req, res) {
    try {
      const { id, field2, field3 } = req.body;
      const updatedRecord = await Babble.findByIdAndUpdate(
        req.params.id,
        { id, user, file, language, srt, txt },
        { new: true }
      );
      res.json(updatedRecord);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Delete a record
  recordRoutes.route("/:id").delete(async (req, res) => {
    try {
      const deletedRecord = await Babble.findByIdAndDelete(req.params.id);
      res.json(deletedRecord);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });


// Get all records for a specific user
recordRoutes.route("/babbleroute/user/:user").get(async function (req, res) {
  try {
    const { user } = req.params;
    const result = await Babble.findByUser(user);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
  
  module.exports = recordRoutes;
