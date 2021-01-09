const express = require("express");
const auth = require("./routes/auth");
const post = require("./routes/post");
const user = require("./routes/user");

const app = express();

app.use(express.json());

app.use(auth);
app.use(post);
app.use(user);

const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

app.listen(PORT, console.log(`Server running on PORT ${PORT}...`));
