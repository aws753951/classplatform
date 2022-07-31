const router = require("express").Router();
const Course = require("../models").CourseModel;
const courseValidation = require("../validation").courseValidation;

// create
// post a new course
router.post("/", async (req, res) => {
  const { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  if (req.user.isStudent()) return res.status(400).send("只有講師才能新增課程");
  let { title, description, url } = req.body;
  let foundCourse = await Course.findOne({ title });
  if (foundCourse) return res.status(400).send("課程已經被註冊");
  let newCourse = new Course({
    title,
    description,
    url,
    instructor: req.user._id,
    date: Date.now() + 8 * 60 * 60 * 1000,
  });
  newCourse
    .save()
    .then(() => {
      res.status(200).send("新課程已經註冊好了");
    })
    .catch((err) => {
      res.status(400).send(err);
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
