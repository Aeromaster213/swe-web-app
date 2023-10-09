const express = require("express");
const recordRoutes = express.Router();

const IdInfo = require("../models/idInfoModel");

// Get all records
recordRoutes.route("/record").get(async function (req, res) {
  try {
    const result = await IdInfo.find({});
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single record by id
recordRoutes.route("/record/:id").get(async function (req, res) {
  try {
    const result = await IdInfo.findById(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new record
recordRoutes.route("/record/add").post(async function (req, res) {
  try {
    const { id, password } = req.body;
    const newRecord = new IdInfo({ id, password });
    await newRecord.save();
    res.status(201).json(newRecord);
    console.log("Added")
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a record by id
recordRoutes.route("/update/:id").post(async function (req, res) {
  try {
    const { id, password } = req.body;
    const updatedRecord = await IdInfo.findByIdAndUpdate(
      req.params.id,
      { id, password },
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
    const deletedRecord = await IdInfo.findByIdAndDelete(req.params.id);
    res.json(deletedRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = recordRoutes;
