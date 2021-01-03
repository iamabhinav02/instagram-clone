import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";

const Home = () => {
	const { state, dispatch } = useContext(UserContext);
	const [data, setData] = useState([]);

	useEffect(async () => {
		let fetched = await fetch("/posts", {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
		});
		fetched = await fetched.json();
		setData(fetched.posts);
		console.log(fetched);
	}, []);

	const likePost = async postId => {
		try {
			let fetched = await fetch("/like", {
				method: "put",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
				body: JSON.stringify({
					postId,
				}),
			});
			fetched = await fetched.json();
			const newData = data.map(item => {
				if (item._id === fetched._id) return fetched;
				else return item;
			});
			setData(newData);
		} catch (err) {
			return err;
		}
	};

	const unlikePost = async postId => {
		try {
			let fetched = await fetch("/unlike", {
				method: "put",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
				body: JSON.stringify({
					postId,
				}),
			});
			fetched = await fetched.json();
			const newData = data.map(item => {
				if (item._id === fetched._id) return fetched;
				else return item;
			});
			setData(newData);
		} catch (err) {
			return err;
		}
	};

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
							{item.likes.includes(state._id) ? (
								<i
									className="material-icons"
									style={{
										color: "black",
										marginLeft: "5px",
									}}
									onClick={() => {
										unlikePost(item._id);
									}}
								>
									thumb_down
								</i>
							) : (
								<i
									className="material-icons"
									style={{
										color: "black",
										marginLeft: "5px",
									}}
									onClick={() => {
										likePost(item._id);
									}}
								>
									thumb_up
								</i>
							)}
							<h6 style={{ textAlign: "left" }}>
								{item.likes.length}{" "}
								{item.likes.length === 1 ? "like" : "likes"}
							</h6>
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
