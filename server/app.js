require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = require("./models/connection");
const router = require("./routes/auth");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server running on PORT ${PORT}...`));
