import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
// import { isEmail, isStrongPassword } from "validator";

const Signup = () => {
	const history = useHistory();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [repassword, setRepassword] = useState("");
	const [image, setImage] = useState("");
	const [url, setUrl] = useState(undefined);

	useEffect(() => {
		if (url) PostDataWithoutPhoto();
	}, [url]);

	const UploadPhoto = async () => {
		try {
			let data = new FormData();
			data.append("file", image);
			data.append("upload_preset", "instagram-clone");
			data.append("cloud_name", "profhub");

			let fetchedData = await fetch(
				"https://api.cloudinary.com/v1_1/profhub/image/upload",
				{
					method: "post",
					body: data,
				}
			);

			fetchedData = await fetchedData.json();
			setUrl(fetchedData.url);
		} catch (err) {
			M.toast({ html: err.message, classes: "#c62828 red darken-3" });
		}
	};

	const PostDataWithoutPhoto = async () => {
		try {
			const fetchedData = await fetch("/signup", {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					password,
					email,
					username,
					repassword,
					photo: url,
				}),
			});
			const data = await fetchedData.json();
			if (data.error) {
				throw new Error(data.error);
			} else {
				M.toast({
					html: data.message,
					classes: "#43a047 green darken-1",
				});
				history.push("/login");
			}
		} catch (err) {
			M.toast({
				html: err.message,
				classes: "#c62828 red darken-3",
			});
		}
	};

	const SignupData = async () => {
		if (image) UploadPhoto();
		else PostDataWithoutPhoto();
	};

	return (
		<div className="login-card">
			<div className="card large auth-card input-field">
				<h2>Signup</h2>
				<input
					type="text"
					placeholder="Name"
					value={name}
					onChange={e => setName(e.target.value)}
				/>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={e => setUsername(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Re-enter Password"
					value={repassword}
					onChange={e => setRepassword(e.target.value)}
				/>
				<div className="file-field input-field">
					<div className="btn">
						<span>Upload</span>
						<input
							type="file"
							onChange={e => setImage(e.target.files[0])}
						/>
					</div>
					<div className="file-path-wrapper input-field">
						<input
							className="file-path"
							type="text"
							placeholder="Upload an image (Optional)"
						/>
					</div>
				</div>
				<button
					className="btn waves-effect waves-light #ef5350 red lighten-1 button-margin"
					onClick={SignupData}
				>
					Signup
				</button>
			</div>
			<h6 className="login-label">
				<Link to="/login">
					{" "}
					<i>Already have an account?</i>
				</Link>
			</h6>
		</div>
	);
};

export default Signup;
