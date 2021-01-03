import React, { useState, useEffect } from "react";

const Home = () => {
	const [data, setData] = useState([]);

	useEffect(async () => {
		let fetched = await fetch("/posts", {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
		});
		fetched = await fetched.json();
		setData(fetched.posts);
	}, []);

	return (
		<div className="home">
			{data.map(item => {
				return (
					<div className="card home-card" key={item._id}>
						<h5>{item.user.username}</h5>
						<h7>{item.location}</h7>
						<div className="card-image">
							<img src={item.image} />
						</div>
						<div className="card-content">
							<i
								className="material-icons"
								style={{ color: "red" }}
							>
								favorite
							</i>
							<h5>{item.caption}</h5>
							<h7>{item.created}</h7>
							<input type="text" placeholder="Add a comment.." />
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Home;
