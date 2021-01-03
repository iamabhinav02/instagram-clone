const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
	image: {
		type: String,
		required: true,
	},
	caption: {
		type: String,
	},
	location: {
		type: String,
	},
	created: {
		type: Date,
		default: Date.now,
	},
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

module.exports = mongoose.model("Post", postSchema);
