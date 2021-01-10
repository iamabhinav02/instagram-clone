import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import M from "materialize-css";

const Reset = () => {
	const history = useHistory();
	const [password, setPassword] = useState("");
	const [repassword, setRepassword] = useState("");
	const { token } = useParams();

	const ResetPassword = async () => {
		try {
			const fetchedData = await fetch("/newpassword", {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					password,
					repassword,
					token,
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
					type="password"
					placeholder="Enter new password"
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Re-enter password"
					value={repassword}
					onChange={e => setRepassword(e.target.value)}
				/>
				<button
					className="btn waves-effect waves-light #ef5350 red lighten-1 button-margin"
					onClick={ResetPassword}
				>
					Change Password
				</button>
			</div>
		</div>
	);
};

export default Reset;
