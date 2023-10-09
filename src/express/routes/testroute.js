const express = require("express");
const recordRoutes = express.Router();

const Test = require("../models/testModel");

// Get all records
recordRoutes.route("/testroute").get(async function (req, res) {
    try {
      const result = await Test.find({});
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Get a single record by id
  recordRoutes.route("/testroute/:id").get(async function (req, res) {
    try {
      const result = await Test.findById(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Create a new record
  recordRoutes.route("/testroute/add").post(async function (req, res) {
    try {
      const { id, field2, field3 } = req.body;
      const newRecord = new Test({ id, field2, field3 });
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
      const updatedRecord = await Test.findByIdAndUpdate(
        req.params.id,
        { id, field2, field3 },
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
      const deletedRecord = await Test.findByIdAndDelete(req.params.id);
      res.json(deletedRecord);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  module.exports = recordRoutes;
