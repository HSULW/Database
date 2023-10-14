const express = require("express");
const app = express();
// const mysql = require("mysql");
const mysql = require('mysql2')
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "qaz15988",
  database: "projecttest",
});

app.post("/create", (req, res) => {
  const studentid = req.body.studentid;
  const grade = req.body.grade;
  const name = req.body.name;
  const groupposition = req.body.groupposition;
  const groupid = req.body.groupid;

  db.query(
    "INSERT INTO projects (studentid, grade, name, groupposition, groupid) VALUES (?,?,?,?,?)",
    [studentid, grade, name, groupposition, groupid],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/projects", (req, res) => {
  db.query("SELECT * FROM projects", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const studentid = req.body.studentid;
  db.query(
    "UPDATE employees SET studentid = ? WHERE id = ?",
    [studentid, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM projects WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
