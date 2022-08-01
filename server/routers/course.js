const router = require("express").Router();
const Course = require("../models").CourseModel;
const User = require("../models").UserModel;
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
router.post("/enroll/:_id", (req, res) => {
  let { user_id } = req.body;
  let { _id } = req.params;
  Course.findOne({ _id }).then((item) => {
    if (item.students.includes(user_id)) {
      res.send("你已經註冊過這堂課囉!");
    } else {
      item.students.push(user_id);
      User.findOne({ _id: user_id }).then((user) => {
        user.enrolled.push(_id);
        user.save();
      });
      item.save().then(() => {
        res.send("已經幫你註冊好囉，現在幫你導到個人頁面");
      });
    }
  });
});

// giv course good or bad
router.post("/rating/:_id", (req, res) => {
  let { _id } = req.params;
  let { user_id, rating } = req.body;
  Course.findOne({ _id }).then((item) => {
    if (rating == 1) {
      if (item.good.indexOf(user_id) > -1) {
        item.good.splice(item.good.indexOf(user_id), 1);
      } else {
        item.good.push(user_id);
        if (item.bad.indexOf(user_id) > -1) {
          item.bad.splice(item.bad.indexOf(user_id), 1);
        }
      }
    } else {
      if (item.bad.indexOf(user_id) > -1) {
        item.bad.splice(item.bad.indexOf(user_id), 1);
      } else {
        item.bad.push(user_id);
        if (item.good.indexOf(user_id) > -1) {
          item.good.splice(item.good.indexOf(user_id), 1);
        }
      }
    }
    item.save().then((i) => {
      res.json({
        good: i.good.length,
        bad: i.bad.length,
      });
    });
  });
});

// read

// get student enrolled course
router.get("/enroll/:_id", (req, res) => {
  let { _id } = req.params;
  Course.find({ students: _id })
    .populate("instructor", ["username", "email"])
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// get courses with course id
router.get("/:_id", (req, res) => {
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
