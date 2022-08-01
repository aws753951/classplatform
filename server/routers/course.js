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
    lastdate: Date.now() + 8 * 60 * 60 * 1000,
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

// get students enrolled courses - student
router.get("/enroll/:_id", (req, res) => {
  let { _id } = req.params;
  Course.findOne({ _id })
    .populate("instructor", ["username", "email"])
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});
// get instructor posted courses - instructor
router.get("/post/:_id", (req, res) => {
  let { _id } = req.params;
  Course.find({ instructor: _id })
    .populate("instructor", ["username", "email"])
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("這個講師沒有任何課");
    });
});

// update - instructor
router.patch("/:_id", (req, res) => {});

// delete - instructor
router.delete("/:_id", (req, res) => {
  let { _id } = req.params;
  Course.deleteOne({ _id })
    .then(() => {
      res.status(200).send("刪除課程");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
