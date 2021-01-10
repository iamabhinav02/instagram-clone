import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

const Reset = () => {
	const history = useHistory();
	const [email, setEmail] = useState("");

	const ResetPassword = async () => {
		try {
			const fetchedData = await fetch("/reset", {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
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

	return (
		<div className="login-card">
			<div className="card medium auth-card input-field">
				<h3>Reset Password</h3>
				<input
					type="text"
					placeholder="Email (Provide valid email)"
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<button
					className="btn waves-effect waves-light #ef5350 red lighten-1 button-margin"
					onClick={ResetPassword}
				>
					Reset
				</button>
			</div>
			<h6 className="login-label">
				<Link to="/login">
					{" "}
					<i>Return to Login page</i>
				</Link>
			</h6>
		</div>
	);
};

export default Reset;
