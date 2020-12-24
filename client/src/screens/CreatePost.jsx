import React from "react";

const CreatePost = () => {
	return (
		<div
			className="card input-field"
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
					<input type="file" />
				</div>
				<div className="file-path-wrapper">
					<input
						className="file-path validate"
						type="text"
						placeholder="Upload an image"
					/>
				</div>
			</div>
			<input type="text" placeholder="Caption" />
			<input type="text" placeholder="Add a location" />
			<input type="text" placeholder="Tags" />
			<button className="btn waves-effect waves-light #ef5350 red lighten-1 button-margin">
				Add post
			</button>
		</div>
	);
};

export default CreatePost;
