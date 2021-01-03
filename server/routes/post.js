const express = require("express");

const db = require("../models/connection");
const authentication = require("../middleware/authentication");

const router = express.Router();

router.post("/createpost", authentication, async (req, res) => {
	try {
		const { image, caption, location } = req.body;
		const post = new db.Post({
			image,
			caption,
			location,
			user: req.user,
		});
		const saved = await post.save();
		if (saved) {
			return res.status(201).json(saved);
		} else throw Error();
	} catch (error) {
		return res
			.status(422)
			.json({ error: "Could not be able to create post." });
	}
});

router.get("/posts", authentication, async (req, res) => {
	try {
		const posts = await db.Post.find().populate("user", "_id username");
		res.status(200).json({ posts });
	} catch (error) {
		res.status(401).json({
			error: "Could not load the posts. Try again!!",
		});
	}
});

router.get("/post", authentication, async (req, res) => {
	try {
		const { _id } = req.user;
		const posts = await db.Post.find({ user: _id }).populate(
			"user",
			"_id username"
		);
		res.status(200).json({ posts });
	} catch (err) {
		res.status(401).json({ error: "Could not find any post. Try again!!" });
	}
});

module.exports = router;
