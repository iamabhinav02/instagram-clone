import React, { useEffect, useState, useContext, useRef } from "react";
import { UserContext } from "../App";
import M from "materialize-css";

const Profile = () => {
	const [posts, setPosts] = useState([]);
	const { state, dispatch } = useContext(UserContext);
	const [image, setImage] = useState("");
	const [post, setPost] = useState("");

	useEffect(() => {
		var elems = document.querySelectorAll(".modal");
		M.Modal.init(elems);
	});

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
					<button className="btn file-field button-margin #00acc1 cyan darken-1">
						<input
							type="file"
							onChange={e => {
								updatePhoto(e.target.files[0]);
							}}
						/>
						Update photo
					</button>
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
							{state ? state.followers.length : "0"}{" "}
							{state
								? state.followers.length === 1
									? "follower"
									: "followers"
								: "followers"}
						</h6>
						<h6>
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
								onClick={() => {
									setPost(item);
								}}
								data-target="modal2"
							/>
							<div className="gallery-item-info">
								<ul>
									<li className="gallery-item-likes">
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
									<li className="gallery-item-comments">
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
				<div className="modal" id="modal2">
					<div className="modal-content">
						<div className="row">
							<div className="col s8">
								<img
									className="gallery-image"
									src={post.image}
									alt={post.caption}
									key={post._id}
								/>
							</div>
							<div className="col s4"></div>
						</div>
					</div>
					<div className="modal-footer">
						<button
							className="modal-close waves-effect waves-green btn-flat"
							onClick={() => setPost("")}
						>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
