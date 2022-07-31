const mongoose = require("mongoose");

let CourseSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  //   document who enroll this course
  students: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "User",
  },
  url: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: null,
  },
  good: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "User",
  },
  bad: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "User",
  },
});

module.exports = mongoose.model("Course", CourseSchema);
