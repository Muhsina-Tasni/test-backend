const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    // await mongoose.connect('mongodb://localhost:27017/todo')
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected successfully");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
