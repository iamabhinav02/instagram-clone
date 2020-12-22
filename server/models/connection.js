const mongoose = require("mongoose");

mongoose
	.connect(process.env.DATABASE, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("Connection to database successful!!");
	})
	.catch(err => {
		console.log(err.message);
	});

const User = require("./user");

module.exports.User = User;
