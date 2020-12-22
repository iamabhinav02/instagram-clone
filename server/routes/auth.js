const express = require("express");
const router = express.Router();
const db = require("../models/connection");

router.post("/signup", async (req, res) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res
				.status(422)
				.json({ error: "Please fill all the fields." });
		}
		const savedUser = await db.User.findOne({ email });
		if (savedUser) {
			return res
				.status(422)
				.json({ message: "User already exists with this email" });
		}
		const user = new db.User({ email, name, password });
		const result = await user.save();
		if (result) {
			return res
				.status(201)
				.json({ message: "You have successfully registered" });
		} else {
			return res.status(500).json({ message: "Could not be registered" });
		}
	} catch (err) {
		res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
