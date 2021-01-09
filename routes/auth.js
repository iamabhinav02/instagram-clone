const express = require("express");
const jwt = require("jsonwebtoken");

const db = require("../models/connection");
// const authentication = require("../middleware/authentication");

const router = express.Router();

// router.get("/protected", authentication, async (req, res) => {
// 	const { _id } = req.user;
// 	const user = await db.User.findById(_id);
// 	res.status(200).json({ _id: user._id, username: user.username });
// });

router.post("/signup", async (req, res) => {
	try {
		const { name, email, password, username, repassword, photo } = req.body;
		const savedUseremail = await db.User.findOne({ email });
		if (savedUseremail)
			return res
				.status(422)
				.json({ error: "User already exists with this email" });
		const savedUsername = await db.User.findOne({ username });
		if (savedUsername)
			return res
				.status(422)
				.json({ error: "User already exists with this username" });
		if (password === repassword) {
			const user = new db.User({
				email,
				name,
				password,
				username,
				photo,
			});
			const result = await user.save();
			if (result)
				return res
					.status(201)
					.json({ message: "You have successfully registered" });
		} else {
			return res.status(422).json({ error: "Passwords do not match" });
		}
	} catch (err) {
		res.status(422).json({
			error: "Cannot register. Please fill the fields again",
		});
	}
});

router.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await db.User.findOne({ username });
		const result = await user.comparePassword(password);
		if (result) {
			const token = jwt.sign({ _id: user._id }, process.env.SECRET);
			const {
				_id,
				name,
				email,
				username,
				followers,
				following,
				photo,
			} = user;
			return res.status(200).json({
				token,
				user: {
					_id,
					name,
					email,
					username,
					followers,
					following,
					photo,
				},
			});
		} else throw Error();
	} catch (err) {
		res.status(422).json({ error: "Invalid Email/Password" });
	}
});

module.exports = router;
