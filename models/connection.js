const mongoose = require("mongoose");
const { DATABASE } = require("../config/secretkeys");

mongoose
	.connect(DATABASE, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log("Connection to database successful!!");
	})
	.catch(err => {
		console.log(err.message);
	});

const User = require("./user");
const Post = require("./posts");

module.exports.User = User;
module.exports.Post = Post;
