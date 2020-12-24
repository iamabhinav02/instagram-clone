import React from "react";

const Profile = () => {
	return (
		<div style={{ maxWidth: "768px", margin: "0px auto" }}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-around",
					margin: "18px 0px",
					borderBottom: "1px solid gray",
					textAlign: "center",
				}}
			>
				<div>
					<img
						style={{
							width: "160px",
							height: "160px",
							borderRadius: "50%",
						}}
						src="https://images.unsplash.com/photo-1508674861872-a51e06c50c9b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
					/>
				</div>
				<div>
					<h4>Abhinav Kumar</h4>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							width: "109%",
						}}
					>
						<h6>40 posts</h6>
						<h6>40 followers</h6>
						<h6>40 following</h6>
					</div>
				</div>
			</div>
			<div className="profile-gallery">
				<img
					className="profile-gallery-item"
					src="https://images.unsplash.com/photo-1508674861872-a51e06c50c9b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
				/>
				<img
					className="profile-gallery-item"
					src="https://images.unsplash.com/photo-1508674861872-a51e06c50c9b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
				/>
				<img
					className="profile-gallery-item"
					src="https://images.unsplash.com/photo-1508674861872-a51e06c50c9b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
				/>
				<img
					className="profile-gallery-item"
					src="https://images.unsplash.com/photo-1508674861872-a51e06c50c9b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
				/>
				<img
					className="profile-gallery-item"
					src="https://images.unsplash.com/photo-1508674861872-a51e06c50c9b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
				/>
				<img
					className="profile-gallery-item"
					src="https://images.unsplash.com/photo-1508674861872-a51e06c50c9b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
				/>
				<img
					className="profile-gallery-item"
					src="https://images.unsplash.com/photo-1508674861872-a51e06c50c9b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
				/>
				<img
					className="profile-gallery-item"
					src="https://images.unsplash.com/photo-1508674861872-a51e06c50c9b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
				/>
				<img
					className="profile-gallery-item"
					src="https://images.unsplash.com/photo-1508674861872-a51e06c50c9b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
				/>
			</div>
		</div>
	);
};

export default Profile;
