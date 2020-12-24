import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
	return (
		<div className="login-card">
			<div className="card medium auth-card input-field">
				<h2>Login</h2>
				<input type="text" placeholder="Username" />
				<input type="text" placeholder="Password" />
				<button className="btn waves-effect waves-light #ef5350 red lighten-1 button-margin">
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
