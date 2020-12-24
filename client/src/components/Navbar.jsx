import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
	return (
		<nav>
			<div className="nav-wrapper white">
				<Link to="/" className="brand-logo">
					Instagram
				</Link>
				<ul id="nav-mobile" className="right">
					<li>
						<Link to="/profile">Profile</Link>
					</li>
					<li>
						<Link to="/create">Create Post</Link>
					</li>
					<li>
						<Link to="/login">Login</Link>
					</li>
					<li>
						<Link to="/signup">Signup</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default NavBar;
