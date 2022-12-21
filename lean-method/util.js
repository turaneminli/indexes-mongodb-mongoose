const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

exports.connectMongoose = (fn) => {
  mongoose.connect(process.env.URI).then(() => {
    fn();
  });
};
