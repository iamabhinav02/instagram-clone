const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
	image: {
		type: String,
		default: "No photo",
	},
	caption: {
		type: String,
	},
	location: {
		type: String,
	},
	tags: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	created: {
		type: Date,
		default: Date.now,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

module.exports = mongoose.model("Post", postSchema);
