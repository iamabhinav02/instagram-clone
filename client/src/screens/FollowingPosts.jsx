import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

const FollowingPosts = () => {
	const { state } = useContext(UserContext);
	const [data, setData] = useState([]);

	useEffect(async () => {
		let fetched = await fetch("/getfollowingpost", {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
		});
		fetched = await fetched.json();

		setData(fetched.posts);
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

	const addComment = async (text, postId) => {
		try {
			let fetched = await fetch("/comment", {
				method: "put",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
				body: JSON.stringify({
					postId,
					text,
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

	const deletePost = async postId => {
		try {
			let fetched = await fetch(`/delete/${postId}`, {
				method: "delete",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
			});
			fetched = await fetched.json();
			const newData = data.filter(item => {
				return item._id !== fetched._id;
			});
			setData(newData);
		} catch (err) {
			console.log(err.message);
		}
	};

	const deleteComment = async (postId, commentId) => {
		try {
			let fetched = await fetch(`/delete/comment/${postId}`, {
				method: "put",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
				body: JSON.stringify({
					commentId,
				}),
			});
			const result = await fetched.json();
			const newData = data.map(item => {
				if (item._id === result._id) return result;
				else return item;
			});
			setData(newData);
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<div className="home">
			{data.map(item => {
				return (
					<div className="card home-card" key={item._id}>
						<h5>
							<Link
								to={
									item.user._id !== state._id
										? `/profile/${item.user._id}`
										: `/profile`
								}
							>
								{item.user.username}
							</Link>
							{item.user._id === state._id && (
								<i
									className="material-icons"
									style={{
										color: "black",
										float: "right",
										cursor: "pointer",
										margin: "10px",
									}}
									onClick={() => {
										deletePost(item._id);
									}}
								>
									delete
								</i>
							)}
						</h5>
						<span>{item.location}</span>
						<div className="card-image">
							<img src={item.image} alt={item.caption} />
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
										cursor: "pointer",
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
										cursor: "pointer",
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
							{item.comments.map(records => {
								return (
									<h6
										style={{
											textAlign: "left",
										}}
										key={records._id}
									>
										<span
											style={{
												fontWeight: "500",
											}}
										>
											{records.user.username}
										</span>{" "}
										<span style={{ float: "right" }}>
											{records.user._id === state._id && (
												<i
													className="material-icons"
													style={{
														color: "black",
														cursor: "pointer",
														fontSize: "1.3rem",
													}}
													onClick={() => {
														deleteComment(
															item._id,
															records._id
														);
													}}
												>
													delete
												</i>
											)}
										</span>
										<span style={{ textAlign: "justify" }}>
											{records.text}
										</span>
									</h6>
								);
							})}
							<form
								onSubmit={e => {
									e.preventDefault();
									addComment(e.target[0].value, item._id);
									e.target[0].value = "";
								}}
							>
								<input
									type="text"
									placeholder="Add a comment.."
								/>
							</form>
							<span>{item.created}</span>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default FollowingPosts;
