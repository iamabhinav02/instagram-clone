import React, { useContext, useRef, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css";

const NavBar = () => {
	const { state, dispatch } = useContext(UserContext);
	const history = useHistory();
	const searchBar = useRef(null);
	const sidenav = useRef(null);
	const [Search, setSearch] = useState("");
	const [UserDetails, setUserDetails] = useState([]);

	useEffect(() => {
		M.Sidenav.init(sidenav.current);
	});

	useEffect(() => {
		M.Modal.init(searchBar.current);
	}, []);

	const SearchUser = async query => {
		try {
			setSearch(query);
			let fetched = await fetch("/search", {
				method: "post",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
				body: JSON.stringify({
					query,
				}),
			});
			fetched = await fetched.json();
			setUserDetails(fetched.user);
		} catch (err) {
			console.log(err);
		}
	};

	const RenderList = () => {
		if (state) {
			return [
				<li key="Search">
					<i
						data-target="modal1"
						className="large material-icons modal-trigger"
						style={{ color: "black", cursor: "pointer" }}
					>
						search
					</i>
				</li>,
				<li key="Profile">
					<Link to="/profile">Profile</Link>
				</li>,
				<li key="Create Post">
					<Link to="/createpost">Create Post</Link>
				</li>,
				<li key="My Following">
					<Link to="/following">My Feed</Link>
				</li>,
				<li key="Logout">
					<button
						style={{ marginRight: "20px" }}
						className="btn #e53935 red darken-1 button-margin"
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

	const RenderListSidenav = () => {
		if (state) {
			return [
				<li key="Search">
					<i
						data-target="modal1"
						className="material-icons modal-trigger"
						style={{
							color: "black",
							cursor: "pointer",
							margin: "10px 0 0 30px",
						}}
					>
						search
					</i>
				</li>,
				<li key="Profile">
					<Link
						to="/profile"
						onClick={() => {
							M.Sidenav.getInstance(sidenav.current).close();
						}}
					>
						Profile
					</Link>
				</li>,
				<li key="Create Post">
					<Link
						to="/createpost"
						onClick={() => {
							M.Sidenav.getInstance(sidenav.current).close();
						}}
					>
						Create Post
					</Link>
				</li>,
				<li key="My Following">
					<Link
						to="/following"
						onClick={() => {
							M.Sidenav.getInstance(sidenav.current).close();
						}}
					>
						My Feed
					</Link>
				</li>,
				<li key="Logout">
					<button
						className="btn #e53935 red darken-1 button-margin"
						onClick={() => {
							M.Sidenav.getInstance(sidenav.current).close();
							localStorage.clear();
							dispatch({ type: "CLEAR" });
							history.push("/login");
						}}
						style={{ marginLeft: "20px" }}
					>
						Logout
					</button>
				</li>,
			];
		} else {
			return [
				<li key="Login">
					<Link
						to="/login"
						onClick={() => {
							M.Sidenav.getInstance(sidenav.current).close();
						}}
					>
						Login
					</Link>
				</li>,
				<li key="Signup">
					<Link
						to="/signup"
						onClick={() => {
							M.Sidenav.getInstance(sidenav.current).close();
						}}
					>
						Signup
					</Link>
				</li>,
			];
		}
	};

	return (
		<>
			<nav>
				<div className="nav-wrapper white">
					<Link to={state ? "/" : "/login"} className="brand-logo">
						Instagram
					</Link>
					<a
						data-target="mobile-demo"
						className="sidenav-trigger"
						href="#"
					>
						<i
							className="material-icons"
							style={{ color: "black" }}
						>
							menu
						</i>
					</a>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						{RenderList()}
					</ul>
				</div>
				<div className="modal" id="modal1" ref={searchBar}>
					<div className="modal-content" style={{ color: "black" }}>
						<input
							type="text"
							placeholder="Search users"
							value={Search}
							onChange={e => SearchUser(e.target.value)}
						/>
						<ul className="collection">
							{UserDetails.map(user => {
								return (
									<li
										className="collection-item"
										key={user._id}
									>
										<Link
											to={
												user._id === state._id
													? `/profile`
													: `/profile/${user._id}`
											}
											onClick={() => {
												M.Modal.getInstance(
													searchBar.current
												).close();
												setSearch("");
												setUserDetails([]);
											}}
										>
											<div className="row">
												<div
													className="col s1"
													style={{
														paddingLeft: "0px",
													}}
												>
													<img
														style={{
															width: "45px",
															height: "45px",
															borderRadius: "50%",
														}}
														src={user.photo}
														alt="Avatar"
														className="cirlce"
													/>
												</div>
												<div
													className="col s11"
													style={{
														paddingLeft: "30px",
													}}
												>
													<span className="title">
														{user.name}
													</span>
													<p>@{user.username}</p>
												</div>
											</div>
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
					<div className="modal-footer">
						<button
							className="modal-close waves-effect waves-green btn-flat"
							onClick={() => {
								setSearch("");
								setUserDetails([]);
							}}
						>
							Close
						</button>
					</div>
				</div>
			</nav>
			<ul className="sidenav" id="mobile-demo" ref={sidenav}>
				{RenderListSidenav()}
			</ul>
		</>
	);
};

export default NavBar;
