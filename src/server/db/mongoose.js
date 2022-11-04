const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/pull-requests");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
};

connectToDB();
