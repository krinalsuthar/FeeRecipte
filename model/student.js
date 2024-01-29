const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  PRN: {
    type: Number,

    validator: function (value) {
      return /^\d{16}$/.test(value); // Validate if the value has exactly 16 digits
    },
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  sem: {
    type: Number,
    required: true,
  },
  referance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "fee",
  },
});

const student = new mongoose.model("student", studentSchema);

module.exports = student;
