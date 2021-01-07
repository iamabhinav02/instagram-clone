import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

const NavBar = () => {
	const { state, dispatch } = useContext(UserContext);
	const history = useHistory();
	const RenderList = () => {
		if (state) {
			return [
				<li key="Profile">
					<Link to="/profile">Profile</Link>
				</li>,
				<li key="Create Post">
					<Link to="/createpost">Create Post</Link>
				</li>,
				<li key="My Following">
					<Link to="/following">My Following</Link>
				</li>,
				<li key="Logout">
					<button
						className="btn #c62828 red darken-3 button-margin"
						onClick={() => {
							localStorage.clear();
							dispatch({ type: "CLEAR" });
							history.push("/login");
						}}
					>
						Logout
					</button>
				</li>,
			];
		} else {
			return [
				<li key="Login">
					<Link to="/login">Login</Link>
				</li>,
				<li key="Signup">
					<Link to="/signup">Signup</Link>
				</li>,
			];
		}
	};

	return (
		<nav>
			<div className="nav-wrapper white">
				<Link to={state ? "/" : "/login"} className="brand-logo">
					Instagram
				</Link>
				<ul id="nav-mobile" className="right">
					{RenderList()}
				</ul>
			</div>
		</nav>
	);
};

export default NavBar;
