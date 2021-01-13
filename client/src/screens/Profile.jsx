import React, { useEffect, useState, useContext, useRef } from "react";
import { UserContext } from "../App";
import M from "materialize-css";

const Profile = () => {
	const [posts, setPosts] = useState([]);
	const { state, dispatch } = useContext(UserContext);
	const [image, setImage] = useState("");

	useEffect(async () => {
		const fetched = await fetch("/userprofile", {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
		});
		const data = await fetched.json();
		setPosts(data.posts);
	}, []);

	useEffect(async () => {
		try {
			if (image) {
				let data = new FormData();
				data.append("file", image);
				data.append("upload_preset", "instagram-clone");
				data.append("cloud_name", "profhub");

				let fetchedData = await fetch(
					"https://api.cloudinary.com/v1_1/profhub/image/upload",
					{
						method: "post",
						body: data,
					}
				);

				fetchedData = await fetchedData.json();

				let fetchedPhoto = await fetch("/updatephoto", {
					method: "put",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("jwt")}`,
					},
					body: JSON.stringify({
						url: fetchedData.url,
					}),
				});
				fetchedPhoto = await fetchedPhoto.json();

				localStorage.setItem(
					"user",
					JSON.stringify({
						...state,
						photo: fetchedPhoto.photo.photo,
					})
				);
				dispatch({
					type: "UPDATE PHOTO",
					payload: fetchedPhoto.photo.photo,
				});

				M.toast({
					html: "Updated photo",
					classes: "#43a047 green darken-1",
					displayLength: 2000,
				});
			}
		} catch (err) {
			M.toast({
				html: "Could not update photo",
				classes: "#c62828 red darken-3",
				displayLength: 2000,
			});
		}
	}, [image]);

	const updatePhoto = file => {
		setImage(file);
	};

	return (
		<div
			style={{ maxWidth: "768px", margin: "0px auto", marginTop: "20px" }}
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
						src={state ? state.photo : "loading"}
						alt="Profile"
					/>
					<button
						className="btn-small file-field #00acc1 cyan darken-1"
						style={{
							borderRadius: "2em",
							border: "0.16em solid rgba(255,255,255,0)",
							margin: "10px auto",
						}}
					>
						<input
							type="file"
							onChange={e => {
								updatePhoto(e.target.files[0]);
							}}
						/>
						Update Photo
					</button>
				</div>
				<div className="col s1"></div>
				<div className="col s7" style={{ paddingLeft: "10px" }}>
					<h4>{state ? state.name : "Loading..."}</h4>
					<h5>
						<i style={{ color: "black" }}>
							@{state ? state.username : "Loading..."}
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
							{posts.length}{" "}
							{posts.length === 1 ? "post" : "posts"}
						</h6>
						<h6 style={{ padding: "0 4px" }}>
							{state ? state.followers.length : "0"}{" "}
							{state
								? state.followers.length === 1
									? "follower"
									: "followers"
								: "followers"}
						</h6>
						<h6 style={{ padding: "0 4px" }}>
							{state ? state.following.length : "0"} following
						</h6>
					</div>
				</div>
			</div>
			<div className="gallery">
				{posts.map(item => {
					return (
						<div className="gallery-item">
							<img
								className="gallery-image modal-trigger"
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
												style={{ color: "white" }}
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
	);
};

export default Profile;
