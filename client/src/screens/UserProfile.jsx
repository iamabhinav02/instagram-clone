import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css";

const UserProfile = () => {
	const [userProfile, setProfile] = useState(null);
	const { state, dispatch } = useContext(UserContext);
	const { userId } = useParams();
	const [showFollow, setShowFollow] = useState(
		state ? !state.following.includes(userId) : true
	);

	useEffect(() => {
		var elems = document.querySelectorAll(".materialboxed");
		M.Materialbox.init(elems);
	});

	useEffect(async () => {
		const fetched = await fetch(`/user/${userId}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
		});
		const data = await fetched.json();
		setProfile(data);
	}, []);

	const followUser = async () => {
		try {
			let fetched = await fetch("/follow", {
				method: "put",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
				body: JSON.stringify({
					followId: userId,
				}),
			});
			fetched = await fetched.json();
			dispatch({
				type: "UPDATE",
				payload: {
					following: fetched.following,
					followers: fetched.followers,
				},
			});
			localStorage.setItem("user", JSON.stringify(fetched));
			setProfile(prevRecord => {
				return {
					...prevRecord,
					user: {
						...prevRecord.user,
						followers: [...prevRecord.user.followers, fetched._id],
					},
				};
			});
			setShowFollow(false);
		} catch (err) {
			console.log(err.message);
		}
	};

	const unfollowUser = async () => {
		try {
			let fetched = await fetch("/unfollow", {
				method: "put",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
				body: JSON.stringify({
					unfollowId: userId,
				}),
			});
			fetched = await fetched.json();
			dispatch({
				type: "UPDATE",
				payload: {
					following: fetched.following,
					followers: fetched.followers,
				},
			});
			localStorage.setItem("user", JSON.stringify(fetched));
			setProfile(prevRecord => {
				const newData = prevRecord.user.followers.filter(
					item => item !== fetched._id
				);
				return {
					...prevRecord,
					user: {
						...prevRecord.user,
						followers: newData,
					},
				};
			});
			setShowFollow(true);
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<>
			{userProfile ? (
				<div
					style={{
						maxWidth: "768px",
						margin: "0px auto",
						marginTop: "20px",
					}}
				>
					<div
						className="row"
						style={{
							paddingBottom: "10px",
							borderBottom: "1px solid grey",
						}}
					>
						<div className="col s4" style={{ textAlign: "center" }}>
							<img
								style={{
									height: "120px",
									width: "120px",
									borderRadius: "50%",
									margin: "0 auto",
								}}
								src={userProfile.user.photo}
								alt="Profile"
							/>
							{showFollow ? (
								<button
									className="btn-small file-field #00acc1 cyan darken-1"
									style={{
										borderRadius: "2em",
										border:
											"0.16em solid rgba(255,255,255,0)",
										margin: "10px auto",
									}}
									onClick={followUser}
								>
									Follow
								</button>
							) : (
								<button
									className="btn-small file-field #00acc1 cyan darken-1"
									style={{
										borderRadius: "2em",
										border:
											"0.16em solid rgba(255,255,255,0)",
										margin: "10px auto",
									}}
									onClick={unfollowUser}
								>
									Unfollow
								</button>
							)}
						</div>
						<div className="col s1"></div>
						<div className="col s7" style={{ paddingLeft: "10px" }}>
							<h4>
								{userProfile.user
									? userProfile.user.name
									: "Loading..."}
							</h4>
							<h5>
								<i style={{ color: "black" }}>
									@
									{userProfile.user
										? userProfile.user.username
										: "Loading..."}
								</i>
							</h5>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									width: "100%",
								}}
							>
								<h6 style={{ padding: "0 4px" }}>
									{userProfile.posts.length}{" "}
									{userProfile.posts.length === 1
										? "post"
										: "posts"}
								</h6>
								<h6 style={{ padding: "0 4px" }}>
									{userProfile.user.followers.length}{" "}
									{userProfile.user.followers.length === 1
										? "follower"
										: "followers"}
								</h6>
								<h6 style={{ padding: "0 4px" }}>
									{userProfile.user.following.length}{" "}
									following
								</h6>
							</div>
						</div>
					</div>
					<div className="gallery">
						{userProfile.posts.map(item => {
							return (
								<div className="gallery-item">
									<img
										className="gallery-image"
										src={item.image}
										alt={item.caption}
										key={item._id}
									/>
									<div className="gallery-item-info">
										<ul>
											<li
												className="gallery-item-likes"
												key="likes"
											>
												<span className="visually-hidden">
													<i
														className="material-icons"
														style={{ color: "red" }}
													>
														favorite
													</i>{" "}
													{item.likes.length}
												</span>
											</li>
											<li
												className="gallery-item-comments"
												key="comments"
											>
												<span className="visually-hidden">
													<i
														className="material-icons"
														style={{
															color: "white",
														}}
													>
														comment
													</i>{" "}
													{item.comments.length}
												</span>
											</li>
										</ul>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			) : (
				<h2>loading...</h2>
			)}
		</>
	);
};

export default UserProfile;
