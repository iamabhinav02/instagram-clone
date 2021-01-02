import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

const Login = () => {
	const history = useHistory();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const LoginData = async () => {
		try {
			const fetchedData = await fetch("/login", {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					password,
					username,
				}),
			});
			const data = await fetchedData.json();
			if (data.error) {
				throw new Error(data.error);
			} else {
				localStorage.setItem("jwt", data.token);
				localStorage.setItem("user", JSON.stringify(data.user));
				M.toast({
					html: "Login successful",
					classes: "#43a047 green darken-1",
				});
				history.push("/");
			}
		} catch (err) {
			M.toast({
				html: err.message,
				classes: "#c62828 red darken-3",
			});
		}
	};

	return (
		<div className="login-card">
			<div className="card medium auth-card input-field">
				<h2>Login</h2>
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
				<button
					className="btn waves-effect waves-light #ef5350 red lighten-1 button-margin"
					onClick={LoginData}
				>
					Login
				</button>
			</div>
			<h6 className="login-label">
				<Link to="/signup">
					{" "}
					<i>Create a new account</i>
				</Link>
			</h6>
		</div>
	);
};

export default Login;
