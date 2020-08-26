// importing the dependencies

const express = require("express");
const cors = require("cors"); //Cross-Origin Resource Sharing
const sql = require("mssql");
const bodyParser = require("body-parser");
var port = process.env.Port || 8000;

const app = express();
app.use(cors());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

//TO CHECK API---------------------------

app.get("/", (req, res) => {
  res.send("Welcome To the API World !!!");
});

//FOR LOGIN AND NEW REGISTRATION OF USER-------------------------------

var Users = require("./routes/Users");
app.use("/users", Users);

//FOR STUDENT DATA -----------------------------------------

// connection with sql

const connection = sql.connect({
  user: "sa",
  password: "abc@1234",
  server: "DESKTOP-D8RVGPM",
  database: "Studentnew",
});

sql.connect((err) => {
  if (err) {
    return err;
  }
});

var request = new sql.Request();

app.get("/data", (req, res) => {
  request.query("SELECT * from TbStudent;", (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      console.log(result);
      return res.json(result);
    }
  });
});

//rest api to insert record from mysql database
app.post("/newRecord", (req, res) => {
  let sql =
    "INSERT INTO TbStudent (Student_name,Student_address,Student_Gender,Student_DOB,Price) VALUES ('" +
    req.body.Student_name +
    "','" +
    req.body.Student_address +
    "','" +
    req.body.Student_Gender +
    "','" +
    req.body.Student_DOB +
    "','" +
    req.body.Price +
    "'); select SCOPE_IDENTITY() as id;";
  console.log(sql);
  let query = request.query(sql, (err, results) => {
    console.log(results.recordset[0].id);
    if (err) console.log(err);
    data = results.recordset[0];
    res.send(data);
  });
});

//rest api to update record from mysql database
app.put("/update/:Student_Id", function (req, res) {
  console.log(req.params.Student_Id);

  var sql =
    "UPDATE TbStudent SET  Student_name = '" +
    req.body.Student_name +
    "',Student_address = '" +
    req.body.Student_address +
    "', Student_Gender = '" +
    req.body.Student_Gender +
    "', Student_DOB = '" +
    req.body.Student_DOB +
    "', Price = '" +
    req.body.Price +
    "' WHERE Student_Id = " +
    req.params.Student_Id;

  console.log(sql);
  let query = request.query(sql, function (err, result) {
    console.log(result);
    if (err) throw err;
    console.log(result.rowsAffected + " record(s) updated");
    res.sendStatus(200);
  });
});

//rest api to delete record from mysql database
app.delete("/delete/:Student_Id", function (req, res) {
  console.log(req.params.Student_Id);
  var querydelete =
    "DELETE FROM TbStudent WHERE Student_Id =" + req.params.Student_Id;
  request.query(querydelete, function (error, results, fields) {
    if (error) throw error;
    res.end("Record has been deleted!");
  });
});

// it will listen on the server
app.listen(8000, () => {
  console.log(`Student server listening on Port` + " " + port);
});
