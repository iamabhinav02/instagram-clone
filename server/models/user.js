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

module.exports = mongoose.model("User", userSchema);
