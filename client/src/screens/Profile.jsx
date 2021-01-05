import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";

const Profile = () => {
	const [posts, setPosts] = useState([]);
	const { state } = useContext(UserContext);

	useEffect(async () => {
		const fetched = await fetch("/post", {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
		});
		const data = await fetched.json();
		setPosts(data.posts);
		console.log(posts);
	}, []);

	return (
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
						src="https://images.unsplash.com/photo-1508674861872-a51e06c50c9b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
						alt="Profile"
					/>
				</div>
				<div style={{ textAlign: "left" }}>
					<h3>{state ? state.name : "Loading..."}</h3>
					<h5>
						<i style={{ color: "black" }}>
							@{state ? state.username : "Loading..."}
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
							{posts.length}{" "}
							{posts.length === 1 ? "post" : "posts"}
						</h6>
						<h6>
							{state.followers.length}{" "}
							{state.followers.length === 1
								? "follower"
								: "followers"}
						</h6>
						<h6>{state.following.length} following</h6>
					</div>
				</div>
			</div>
			<div className="profile-gallery">
				{posts.map(item => {
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
	);
};

export default Profile;
