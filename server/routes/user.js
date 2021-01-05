const express = require("express");

const db = require("../models/connection");
const authentication = require("../middleware/authentication");

const router = express.Router();

router.get("/user/:id", authentication, (req, res) => {
	db.User.findOne({ _id: req.params.id })
		.select("-password")
		.then(user => {
			db.Post.find({ user: req.params.id })
				.populate("user", "_id username")
				.exec((error, posts) => {
					if (error)
						return res
							.status(404)
							.json({ error: "Selected user posts not found" });
					if (posts) return res.status(200).json({ user, posts });
				});
		})
		.catch(() => {
			return res.status(404).json({ error: "User not found" });
		});
});

module.exports = router;
