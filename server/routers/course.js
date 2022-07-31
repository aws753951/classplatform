const router = require("express").Router();
const Course = require("../models").CourseModel;
const courseValidation = require("../validation").courseValidation;

// create
// post a new course
router.post("/", (req, res) => {
  const { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  if (req.user.isStudent())
    return res.status(400).send("Only instructor can post");
  // need check course schema
  let { title, description } = req.body;
  let newCourse = new Course({
    title,
    description,
    instructor: req.user._id,
  });
  newCourse
    .save()
    .then(() => {
      res.status(200).send("New course has been saved.");
    })
    .catch(() => {
      res.status(400).send("Cant save course.");
    });
});
// enroll a new course - student
router.post("/enroll/:_id", (req, res) => {});

// read
// get all courses
router.get("/", (req, res) => {});
// get course by title
router.get("/title/:name", (req, res) => {});
// get students enrolled courses - student
router.get("/enroll/:_id", (req, res) => {});
// get instructor posted courses - instructor
router.get("/post/:_id", (req, res) => {});

// update - instructor
router.patch("/:_id", (req, res) => {});

// delete - instructor
router.delete("/:_id", (req, res) => {});

module.exports = router;
