const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const sendgrid = require("nodemailer-sendgrid-transport");

const db = require("../models/connection");
const { SECRET, EMAIL_API } = require("../config/secretkeys");

const router = express.Router();

const transporter = nodemailer.createTransport(
	sendgrid({
		auth: {
			api_key: EMAIL_API,
		},
	})
);

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
			if (result) {
				transporter.sendMail({
					to: user.email,
					from: "abhi78570@gmail.com",
					subject: "Signup successful",
					html:
						"<h2>Congratulations on being one of the early tester of this app</h2>",
				});
				return res
					.status(201)
					.json({ message: "You have successfully registered" });
			}
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
			const token = jwt.sign({ _id: user._id }, SECRET);
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

router.post("/reset", async (req, res) => {
	try {
		crypto.randomBytes(32, async (err, buffer) => {
			if (err) {
				throw Error("Error. Try again!");
			} else {
				const token = buffer.toString("hex");
				const user = await db.User.findOne({ email: req.body.email });
				if (!user) throw Error("User with this email does not exist");
				user.resetToken = token;
				user.expiryToken = Date.now() + 3600000;
				const result = await user.save();
				if (result) {
					transporter.sendMail({
						from: "abhi78570@gmail.com",
						to: user.email,
						subject: "Reset password",
						html: `<p>Request for password reset</p>
						<h5>Click on this <a href="http://localhost:3001/reset/${token}">link</a> to reset your password. This link will be active for 1 hour.</h5>`,
					});
					return res
						.status(200)
						.json({ message: "Check your mail for the link" });
				}
			}
		});
	} catch (err) {
		return res.status(422).json({ error: err.message });
	}
});

router.post("/newpassword", async (req, res) => {
	try {
		const { password, repassword, token } = req.body;
		if (password === repassword) {
			const user = await db.User.findOne({
				resetToken: token,
				expiryToken: { $gt: Date.now() },
			});
			if (!user) throw "Link has expired. Send again!";
			user.password = password;
			user.resetToken = undefined;
			user.expiryToken = undefined;
			const result = await user.save();
			if (result)
				return res.status(200).json({ message: "Password updated" });
			else throw Error("Password could not be updated");
		} else {
			throw Error("Passwords do not match");
		}
	} catch (err) {
		return res.status(422).json({ error: err.message });
	}
});

module.exports = router;
