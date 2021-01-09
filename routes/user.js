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

router.put("/follow", authentication, async (req, res) => {
	try {
		const follower = await db.User.findByIdAndUpdate(
			{
				_id: req.body.followId,
			},
			{
				$push: {
					followers: req.user._id,
				},
			},
			{ new: true }
		).select("-password");

		if (!follower) throw Error("Could not follow the user");

		const following = await db.User.findByIdAndUpdate(
			{
				_id: req.user._id,
			},
			{
				$push: {
					following: req.body.followId,
				},
			},
			{ new: true }
		).select("-password");

		if (!following) throw Error("Following not working");

		return res.status(200).json(following);
	} catch (err) {
		return res.status(422).json({ error: err.message });
	}
});

router.put("/unfollow", authentication, async (req, res) => {
	try {
		const unfollower = await db.User.findByIdAndUpdate(
			{
				_id: req.body.unfollowId,
			},
			{
				$pull: {
					followers: req.user._id,
				},
			},
			{ new: true }
		).select("-password");

		if (!unfollower) throw Error("Could not unfollow the user");

		const unfollowing = await db.User.findByIdAndUpdate(
			{
				_id: req.user._id,
			},
			{
				$pull: {
					following: req.body.unfollowId,
				},
			},
			{ new: true }
		).select("-password");

		if (!unfollowing) throw Error("Unfollowing not working");

		return res.status(200).json(unfollowing);
	} catch (err) {
		return res.status(422).json({ error: err.message });
	}
});

router.put("/updatephoto", authentication, async (req, res) => {
	try {
		const photo = await db.User.findByIdAndUpdate(
			req.user._id,
			{
				$set: { photo: req.body.url },
			},
			{ new: true }
		);
		if (!photo) throw Error("Could not update photo");
		return res.status(200).json({ photo });
	} catch (err) {
		return res.status(422).json({ error: err.message });
	}
});

module.exports = router;
