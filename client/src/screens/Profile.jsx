import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";

const Profile = () => {
	const [posts, setPosts] = useState([]);
	const { state } = useContext(UserContext);

	useEffect(async () => {
		const fetched = await fetch("/userprofile", {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
		});
		const data = await fetched.json();
		console.log(data);
		setPosts(data.posts);
	}, []);

	const UploadPhoto = async () => {};

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
				<div style={{ display: "inline-grid" }}>
					<img
						style={{
							width: "180px",
							height: "180px",
							borderRadius: "50%",
						}}
						src={state ? state.photo : "loading"}
						alt="Profile"
					/>
					<div className="file-field btn button-margin">
						<span>Upload Photo</span>
						<input type="file" onChange={UploadPhoto} />
					</div>
				</div>
				<div style={{ textAlign: "left", margin: "25px 0px 0px 0px" }}>
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
							{state.followers ? state.followers.length : "0"}{" "}
							{state.followers
								? state.followers.length === 1
									? "follower"
									: "followers"
								: "followers"}
						</h6>
						<h6>
							{state.following ? state.following.length : "0"}{" "}
							following
						</h6>
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
