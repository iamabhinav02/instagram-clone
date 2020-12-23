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
