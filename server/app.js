require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const auth = require("./routes/auth");
const post = require("./routes/post");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(auth);
app.use(post);

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server running on PORT ${PORT}...`));
