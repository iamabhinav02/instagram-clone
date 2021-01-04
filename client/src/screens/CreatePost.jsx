import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";
const CreatePost = () => {
	const history = useHistory();
	const [image, setImage] = useState("");
	const [caption, setCaption] = useState("");
	const [location, setLocation] = useState("");
	const [url, setUrl] = useState("");

	useEffect(async () => {
		try {
			if (url) {
				let fetchedData = fetch("/createpost", {
					method: "post",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("jwt")}`,
					},
					body: JSON.stringify({
						image: url,
						caption,
						location,
					}),
				});
				let data = await fetchedData.json();
				if (data.error) {
					throw new Error(data.error);
				} else {
					M.toast({
						html: "Post uploaded successfully",
						classes: "#43a047 green darken-1",
					});
					history.push("/");
				}
			}
		} catch (err) {
			M.toast({ html: err.message, classes: "#c62828 red darken-3" });
		}
	}, [url]);

	const PostData = async () => {
		try {
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

			let fetchedDataJson = await fetchedData.json();
			setUrl(fetchedDataJson.url);
		} catch (err) {
			M.toast({ html: err.message, classes: "#c62828 red darken-3" });
		}
	};

	return (
		<div
			className="card"
			style={{
				margin: "30px auto",
				padding: "20px",
				maxWidth: "600px",
				textAlign: "center",
			}}
		>
			<div className="file-field input-field">
				<div className="btn">
					<span>Image</span>
					<input
						type="file"
						onChange={e => setImage(e.target.files[0])}
					/>
				</div>
				<div className="file-path-wrapper input-field">
					<input
						className="file-path"
						type="text"
						placeholder="Upload an image"
					/>
				</div>
			</div>
			<div className="input-field">
				<input
					type="text"
					placeholder="Caption"
					value={caption}
					onChange={e => setCaption(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Add a location"
					value={location}
					onChange={e => setLocation(e.target.value)}
				/>
				<button
					className="btn waves-effect waves-light #ef5350 red lighten-1 button-margin"
					onClick={PostData}
				>
					Add post
				</button>
			</div>
		</div>
	);
};

export default CreatePost;
