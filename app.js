const connection = require("./db-config");
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
  } else {
    console.log(
      "connected to database with threadId :  " + connection.threadId
    );
  }
});

app.use(express.json());
/* APPLICATIONS */

//create a new application

app.post("/applications", function (req, res) {
  const { name, version_number } = req.body[0];
  connection
    .promise()
    .query("INSERT INTO applications (name, version_number) VALUES (?, ?)", [
      name,
      version_number,
    ])
    .then(() => {
      res.status(201).send({
        name,
        version_number,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error creating your application");
    });
});

//retrieve the full list of applications

app.get("/applications", function (req, res) {
  connection
    .promise()
    .query("SELECT * FROM applications")
    .then(([results]) => {
      res.json(results);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send("Error retrieving the applications from the database");
    });
});

//retrieve an application by its ID

app.get("/applications/:id", function (req, res) {
  const { id } = req.params;
  connection
    .promise()
    .query("SELECT * FROM applications a WHERE a.id = ?", [id])
    .then(([results]) => {
      res.json(results);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send("Error retrieving the application from the database");
    });
});

/* COURSES */

//create a new course

app.post("/courses", function (req, res) {
  const { name, creation_date, application } = req.body[0];
  connection
    .promise()
    .query(
      "INSERT INTO courses (name, creation_date, application_id) VALUES (?, ?, ?)",
      [name, creation_date, application]
    )
    .then(([result]) => {
      const id = result.insertId;
      res.status(201).send({
        id,
        name,
        creation_date,
        application,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error posting your course");
    });
});

//retrieve the courses list of one application

app.get("/applications/:id/courses", function (req, res) {
  const { id } = req.params;
  connection
    .promise()
    .query("SELECT * FROM courses WHERE application_id =?", [id])
    .then(([results]) => {
      res.json(results);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving the courses from the database");
    });
});

//APP.LISTEN
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
