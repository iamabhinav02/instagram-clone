import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../App";

const UserProfile = () => {
	const [userProfile, setProfile] = useState(null);
	const { state } = useContext(UserContext);
	const { userId } = useParams();

	useEffect(async () => {
		const fetched = await fetch(`/user/${userId}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
		});
		const data = await fetched.json();
		setProfile(data);
		// console.log(data);
	}, []);

	return (
		<>
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
								src="https://images.unsplash.com/photo-1508674861872-a51e06c50c9b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
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
								<h6>40 followers</h6>
								<h6>40 following</h6>
							</div>
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
		</>
	);
};

export default UserProfile;