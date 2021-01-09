const jwt = require("jsonwebtoken");
const db = require("../models/connection");

module.exports = (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization)
		return res.status(401).json({ error: "No token provided." });
	const token = authorization.split(" ")[1];
	jwt.verify(token, process.env.SECRET, (err, decoded) => {
		if (err)
			return res
				.status(401)
				.json({ error: "Failed to authenticate token" });
		const { _id } = decoded;
		db.User.findById(_id).then(userData => {
			req.user = userData;
			next();
		});
	});
};
