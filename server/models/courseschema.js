const mongoose = require("mongoose");

let CourseSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
    minLength: 3,
    maxLength: 50,
    required: true,
  },
  description: {
    type: String,
    minLength: 6,
    maxLength: 500,
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
    minLength: 25,
    maxLength: 60,
    required: true,
  },
  date: {
    type: Date,
    default: null,
  },
  lastdate: {
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
