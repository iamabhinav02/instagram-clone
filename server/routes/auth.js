const express = require("express");
const jwt = require("jsonwebtoken");

const db = require("../models/connection");
const authentication = require("../middleware/authentication");

const router = express.Router();

router.get("/protected", authentication, async (req, res) => {
	const { _id } = req.decoded;
	const user = await db.User.findById(_id);
	res.status(200).json({ _id, email: user.email });
});

router.post("/signup", async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const savedUser = await db.User.findOne({ email });
		if (savedUser)
			return res
				.status(422)
				.json({ message: "User already exists with this email" });
		const user = new db.User({ email, name, password });
		const result = await user.save();
		if (result)
			return res
				.status(201)
				.json({ message: "You have successfully registered" });
	} catch (err) {
		res.status(422).json({
			message: "Cannot register. Please fill the fields again",
		});
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await db.User.findOne({ email });
		const result = await user.comparePassword(password);
		if (result) {
			const token = jwt.sign({ _id: user._id }, process.env.SECRET);
			return res
				.status(200)
				.json({ _id: user._id, username: user.email, token });
		} else throw Error();
	} catch (err) {
		res.status(422).json({ message: "Invalid Email/Password" });
	}
});

module.exports = router;
