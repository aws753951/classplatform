const router = require("express").Router();
const Course = require("../models").CourseModel;

// get all courses
router.get("/", (req, res) => {
  Course.find({})
    .sort({ date: -1 })
    .populate("instructor", ["username", "email"])
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("No courses.");
    });
});
// get course by title
router.get("/:name", (req, res) => {
  let { name } = req.params;
  Course.find({ title: { $regex: `.*${name}.*`, $options: "i" } })
    .populate("instructor", ["username", "email"])
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("這個講師沒有任何課");
    });
});

module.exports = router;
