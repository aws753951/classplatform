const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 100,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 1024,
  },
  role: {
    type: String,
    enum: ["student", "instructor", "admin"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now() + 8 * 60 * 60 * 1000,
  },
  lastLogin: {
    type: Date,
    default: null,
  },
  // document student's enrolled courses
  enrolled: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "Course",
  },
});

// hash password
UserSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    let hashpassword = await bcrypt.hash(this.password, 12);
    this.password = hashpassword;
    next();
  } else {
    next();
  }
});

// compare hash password
UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, result) {
    if (err) {
      return cb(err, result);
    } else {
      return cb(null, result);
    }
  });
};

// identify indentity
UserSchema.methods.isStudent = function () {
  return this.role == "student";
};
UserSchema.methods.isInstructor = function () {
  return this.role == "instructor";
};
UserSchema.methods.isAdmin = function () {
  return this.role == "admin";
};

module.exports = mongoose.model("User", UserSchema);
