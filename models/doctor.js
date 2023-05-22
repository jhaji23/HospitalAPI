const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: [6, "Please give password more than 6 characters"],
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
