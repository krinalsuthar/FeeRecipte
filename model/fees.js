const mongoose = require("mongoose");

const feesSchema = new mongoose.Schema({
  referance: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
    },
  ],
  PRN: {
    type: Number,
    required: true,
  },
  Tution_Fees: {
    type: Number,
    required: true,
  },
  E_suvidha_Fees: {
    type: Number,
    required: true,
  },
  StudentWelfare_Fees: {
    type: Number,
    required: true,
  },
  Examination_Fees: {
    type: Number,
    required: true,
  },
  Alumni_Fees: {
    type: Number,
    required: true,
  },
  Convocation_Fees: {
    type: Number,
    required: true,
  },
  Total: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  detail: {
    type: String,
  },
  pyment_mode: {
    type: String,
    required: true,
  },
});

// feesSchema.pre("save", function (next) {
//   this.Total =
//     parseInt(this.Tution_Fees) +
//     parseInt(this.E_suvidha_Fees) +
//     parseInt(this.StudentWelfare_Fees) +
//     parseInt(this.Examination_Fees) +
//     parseInt(this.Alumni_Fees) +
//     parseInt(this.Convocation_Fees);
//   console.log(this.Total);
//   fees.Total.save(this.Total);
//   next();
// });

const fees = new mongoose.model("fees", feesSchema);

module.exports = fees;
