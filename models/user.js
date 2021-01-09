const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	followers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	following: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	photo: {
		type: String,
		default:
			"https://res.cloudinary.com/profhub/image/upload/c_scale,h_180,w_180/v1610009101/no-profile_xd3hfl.png",
	},
});

userSchema.pre("save", async function (next) {
	try {
		if (!this.isModified("password")) {
			return next();
		}
		const hashed = await bcrypt.hash(this.password, 10);
		this.password = hashed;
		return next();
	} catch (err) {
		return next(err);
	}
});

userSchema.methods.comparePassword = async function (attempt, next) {
	try {
		return await bcrypt.compare(attempt, this.password);
	} catch (error) {
		return next(error);
	}
};

module.exports = mongoose.model("User", userSchema);
