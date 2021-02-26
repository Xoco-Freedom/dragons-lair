const express = require("express");
const session = require("express-session");
const massive = require("massive");
require("dotenv").config();

const app = express();
const PORT = 4000;

const { CONNECTION_STRING, SESSION_SECRET } = process.env;

app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
  })
);

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set("db", db);
  console.log("db connected");
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
