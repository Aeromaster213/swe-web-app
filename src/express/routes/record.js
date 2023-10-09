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



// const express = require("express");

// const {connection} = require("../server")
// // recordRoutes is an instance of the express router.
// // We use it to define our routes.
// // The router will be added as a middleware and will take control of requests starting with path /record.
// const recordRoutes = express.Router();

// const dbo = require("../db/conn");

// // This help convert the id from string to ObjectId for the _id.
// const ObjectId = require("mongodb").ObjectId;


// // This section will help you get a list of all the records.
// recordRoutes.route("/record").get(function (req, res) {
//   let db_connect = dbo.getDb("user_data");
//   db_connect
//     .collection("id_info")
//     .find({})
//     .toArray(function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     });
// });

// // This section will help you get a single record by id
// recordRoutes.route("/record/:id").get(function (req, res) {
//   let db_connect = dbo.getDb();
//   let myquery = { _id: ObjectId(req.params.id) };
//   db_connect
//     .collection("id_info")
//     .findOne(myquery, function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     });
// });

// // This section will help you create a new record.
// recordRoutes.route("/record/add").post(function (req, response) {
//   let db_connect = dbo.getDb();
//   let myobj = {
//     id: req.body.id,
//     password: req.body.password,
//   };
//   db_connect.collection("id_info").insertOne(myobj, function (err, res) {
//     if (err) throw err;
//     response.json(res);
//   });
// });

// // This section will help you update a record by id.
// recordRoutes.route("/update/:id").post(function (req, response) {
//   let db_connect = dbo.getDb();
//   let myquery = { _id: ObjectId(req.params.id) };
//   let newvalues = {
//     $set: {
//       id: req.body.id,
//       password: req.body.password,
//     },
//   };
//   db_connect
//     .collection("records")
//     .updateOne(myquery, newvalues, function (err, res) {
//       if (err) throw err;
//       console.log("1 document updated");
//       response.json(res);
//     });
// });

// // This section will help you delete a record
// recordRoutes.route("/:id").delete((req, response) => {
//   let db_connect = dbo.getDb();
//   let myquery = { _id: ObjectId(req.params.id) };
//   db_connect.collection("records").deleteOne(myquery, function (err, obj) {
//     if (err) throw err;
//     console.log("1 document deleted");
//     response.json(obj);
//   });
// });

// module.exports = recordRoutes;