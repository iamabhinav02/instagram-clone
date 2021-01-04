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
		const posts = await db.Post.find()
			.populate("user", "_id username")
			.populate("comments.user", "_id username");
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

router.put("/like", authentication, (req, res) => {
	db.Post.findByIdAndUpdate(
		{ _id: req.body.postId },
		{
			$push: { likes: req.user._id },
		},
		{ new: true }
	).exec((err, result) => {
		if (err) {
			return res.status(422).json({ error: err });
		} else {
			return res.status(200).json(result);
		}
	});
});

router.put("/unlike", authentication, (req, res) => {
	db.Post.findByIdAndUpdate(
		{ _id: req.body.postId },
		{
			$pull: { likes: req.user._id },
		},
		{ new: true }
	).exec((err, result) => {
		if (err) {
			return res.status(422).json({ error: err });
		} else {
			return res.status(200).json(result);
		}
	});
});

router.put("/comment", authentication, (req, res) => {
	if (!req.body.text) return null;
	const comment = {
		text: req.body.text,
		user: req.user._id,
	};
	db.Post.findByIdAndUpdate(
		{ _id: req.body.postId },
		{
			$push: { comments: comment },
		},
		{ new: true }
	)
		.populate("comments.user", "_id username")
		.populate("user", "_id username")
		.exec((err, result) => {
			if (err) {
				return res.status(422).json({ error: err });
			} else {
				return res.status(200).json(result);
			}
		});
});

router.delete(
	"/delete/comment/:postId/:commentId",
	authentication,
	(req, res) => {
		db.Post.findByIdAndUpdate(
			{
				_id: req.params.postId,
			},
			{
				$pull: {
					comments: {
						_id: req.params.commentId,
					},
				},
			},
			{ new: true }
		)
			.populate("user", "_id username")
			.populate("comments.user", "_id username")
			.exec((err, post) => {
				if (err)
					return res
						.status(422)
						.json({ error: "Comment could not be deleted" });
				return res.status(200).json(post);
			});
	}
);

router.delete("/delete/:postId", authentication, (req, res) => {
	db.Post.findOne({
		_id: req.params.postId,
	})
		.populate("user", "_id")
		.exec(async (err, post) => {
			if (err)
				return res
					.status(422)
					.json({ error: "Post could not be deleted" });
			if (post.user._id.toString() === req.user._id.toString()) {
				const result = await post.remove();
				if (result) {
					return res.status(200).json(result);
				} else {
					return res
						.status(422)
						.json({ error: "Post could not be deleted" });
				}
			}
		});
});

module.exports = router;
