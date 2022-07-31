require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

mongoose
  .connect(process.env.ATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Atlas.");
  })
  .catch(() => {
    console.log("Failed to connect Atlas.");
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8080, () => {
  console.log("Server is running at port 8080.");
});
