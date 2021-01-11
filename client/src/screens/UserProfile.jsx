import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../App";

const UserProfile = () => {
	const [userProfile, setProfile] = useState(null);
	const { state, dispatch } = useContext(UserContext);
	const { userId } = useParams();
	const [showFollow, setShowFollow] = useState(
		state ? !state.following.includes(userId) : true
	);

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
		<div>
			{userProfile ? (
				<div style={{ maxWidth: "768px", margin: "0px auto" }}>
					<div
						style={{
							display: "flex",
							justifyContent: "space-around",
							margin: "18px 0px",
							borderBottom: "1px solid gray",
							textAlign: "center",
							padding: "0px 0px 5px 0px",
						}}
					>
						<div>
							<img
								style={{
									width: "180px",
									height: "180px",
									borderRadius: "50%",
								}}
								src={userProfile.user.photo}
								alt="Profile"
							/>
						</div>
						<div style={{ textAlign: "left" }}>
							<h3>
								{userProfile.user
									? userProfile.user.name
									: "Loading..."}
							</h3>
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
									justifyContent: "space-between",
									width: "109%",
								}}
							>
								<h6>
									{userProfile.posts.length}{" "}
									{userProfile.posts.length === 1
										? "post"
										: "posts"}
								</h6>
								<h6>
									{userProfile.user.followers.length}{" "}
									{userProfile.user.followers.length === 1
										? "follower"
										: "followers"}
								</h6>
								<h6>
									{userProfile.user.following.length}{" "}
									following
								</h6>
							</div>
							{showFollow ? (
								<button
									className="btn waves-effect waves-light #00acc1 cyan darken-1 button-margin"
									onClick={followUser}
								>
									Follow
								</button>
							) : (
								<button
									className="btn waves-effect waves-light #00acc1 cyan darken-1 button-margin"
									onClick={unfollowUser}
								>
									Unfollow
								</button>
							)}
						</div>
					</div>
					<div className="profile-gallery">
						{userProfile.posts.map(item => {
							return (
								<img
									className="profile-gallery-item"
									src={item.image}
									alt={item.caption}
									key={item._id}
								/>
							);
						})}
					</div>
				</div>
			) : (
				<h2>loading...</h2>
			)}
		</div>
	);
};

export default UserProfile;
