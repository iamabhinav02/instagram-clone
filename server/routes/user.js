const express = require("express");

const db = require("../models/connection");
const authentication = require("../middleware/authentication");

const router = express.Router();

router.get("/user/:id", authentication, async (req, res) => {
	try {
		const user = await db.User.findOne({ _id: req.params.id }).select(
			"-password"
		);
		const userPosts = await db.Post.find({ user: req.params.id }).populate(
			"user",
			"_id username"
		);
		userPosts.exec((error, posts) => {
			if (error) throw Error("Selected user posts not found");
			return res.status(200).json({ user, posts });
		});
	} catch (err) {
		return res.status(404).json({ error: err });
	}
});

module.exports = router;
