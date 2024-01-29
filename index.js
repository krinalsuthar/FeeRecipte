const mongoose = require("mongoose");
const express = require("express");
const methodOverride = require("method-override");
const app = express();
const port = 8080;
const path = require("path");
const ejsMate = require("ejs-mate");
const student = require("./model/student");
const fees = require("./model/fees");
const numWords = require("num-words");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

main()
  .then(() => {
    console.log("success");
  })
  .catch((error) => {
    console.log("Error" + error);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/feesAutoGenerate");
}

app.get("/", async (req, res) => {
  let result = await student.find({});
  // console.log(result);
  res.render("home.ejs", { result });
});
app.get("/add", (req, res) => {
  res.render("form.ejs");
});
app.get("/data", async (req, res) => {
  let { PRN } = req.query;
  let result = await student.findOne({ PRN: PRN });
  if (PRN.length === 16) {
    if (!result) {
      res.send(`<h1>Please enter the valid PRN number!</h1>`);
    } else {
      res.render("data.ejs", { result });
    }
  } else {
    res.send(`<h1>Please enter the exect 16 digit of number...`);
  }
});
app.post("/new/:id", async (req, res) => {
  let { id } = req.body;
  let {
    PRN,
    Tution_Fees,
    E_suvidha_Fees,
    StudentWelfare_Fees,
    Examination_Fees,
    Alumni_Fees,
    Convocation_Fees,
    detail,
    pyment_mode,
  } = req.body;
  console.log(PRN);
  Total =
    parseInt(Tution_Fees) +
    parseInt(E_suvidha_Fees) +
    parseInt(StudentWelfare_Fees) +
    parseInt(Examination_Fees) +
    parseInt(Alumni_Fees) +
    parseInt(Convocation_Fees);
  console.log(Total);
  let result = await fees(req.body);
  let prn = await student.findOne({ PRN: PRN });
  result.referance.push(prn.id);
  result.Total = Total;
  await result.save();
  let data = await fees.findOne({ PRN }).populate("referance");
  console.log(data);
  let amountInWords = await numWords(result.Total);
  console.log(result.Total);
  res.render("receipt.ejs", { result, data, amountInWords });
});
app.get("/receipt", async (req, res) => {
  res.render("Rform.ejs");
});
app.get("/result", async (req, res) => {
  let { PRN } = req.query;
  let result = await fees.findOne({ PRN: PRN });
  let data = await fees.findOne({ PRN }).populate("referance");
  let amountInWords = numWords(result.Total);
  res.render("receiptAuto.ejs", { result, data, amountInWords });
});
app.listen(port, () => {
  console.log(`app is listening on the port number ${port}`);
});
