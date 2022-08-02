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
      res.send("你已經註冊過這堂課囉!，現在幫你導向個人頁面");
    } else {
      item.students.push(user_id);
      item.save();
      User.findOne({ _id: user_id })
        .then((user) => {
          user.enrolled.push(_id);
          user.save().then(() => {
            res.send("幫你註冊好課程囉，現在幫你導向個人頁面");
          });
        })
        .catch((err) => {
          console.log(err);
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
    .sort({ date: -1 })
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
    .sort({ date: -1 })
    .populate("instructor", ["username", "email"])
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("這個講師沒有任何課");
    });
});

// update
// router.patch("/:_id", (req, res) => {
//   let { _id } = req.params;
//   let { user_id } = req.body;
//   User.findOne({ _id: user_id })
//     .then((user) => {
//       if (user.enrolled.includes(_id)) {
//         user.enrolled.splice(user.enrolled.indexOf(_id), 1);
//         user.save();
//         Course.findOne({ _id }).then((course) => {
//           if (course.students.includes(user_id)) {
//             course.students.splice(course.students.indexOf(user_id), 1);
//             course.save();
//           }
//         });
//         res.status(200).send(user);
//       }
//       res.status(200).send("已取消註冊課程");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

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
