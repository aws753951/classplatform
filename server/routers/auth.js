const router = require("express").Router();
const User = require("../models").UserModel;
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  let { username, email, password, password2, role } = req.body;
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  if (password !== password2) return res.status(400).send("密碼不一致");
  let foundUser = await User.findOne({ email });
  if (foundUser) return res.status(400).send("信箱已被註冊");
  let newUser = new User(req.body);
  newUser
    .save()
    .then(() => {
      res.status(200).send("成功註冊囉");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("註冊出現錯誤，請洽作者");
    });
});

router.post("/login", (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let { email, password, password2 } = req.body;
  if (password !== password2) return res.status(400).send("密碼不一致");
  User.findOne({ email }, function (err, user) {
    if (err) return res.status(400).send(err);
    if (!user) return res.status(401).send("錯誤的帳號或密碼");
    user.comparePassword(password, function (err, result) {
      if (err) return res.status(400).send(err);
      if (result) {
        let token = jwt.sign(
          { _id: user._id, email: user.email },
          process.env.JWTPASSWORD
        );
        res.send({
          success: true,
          token: "JWT " + token,
          user,
        });
        user.lastLogin = Date.now() + 8 * 60 * 60 * 1000;
        user.save();
      } else {
        res.status(401).send("錯誤的帳號或密碼");
      }
    });
  });
});

module.exports = router;
