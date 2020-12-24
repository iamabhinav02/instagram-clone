import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
	return (
		<div className="login-card">
			<div className="card large auth-card input-field">
				<h2>Signup</h2>
				<input type="text" placeholder="Name" />
				<input type="text" placeholder="Email" />
				<input type="text" placeholder="Username" />
				<input type="text" placeholder="Password" />
				<button className="btn waves-effect waves-light #ef5350 red lighten-1 button-margin">
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
