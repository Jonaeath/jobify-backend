const mongoose = require("mongoose");
require("dotenv").config();

const mongodburi = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWD}@cluster0.pg0dj0q.mongodb.net/jobify-db`;

const mongodb = async () => {
  await mongoose
    .connect(mongodburi, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

module.exports = mongodb();