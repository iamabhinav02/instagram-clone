import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import CreatePost from "./screens/CreatePost";

const App = () => {
	return (
		<BrowserRouter>
			<NavBar />
			<Route exact path="/">
				<Home />
			</Route>
			<Route exact path="/profile">
				<Profile />
			</Route>
			<Route exact path="/login">
				<Login />
			</Route>
			<Route exact path="/signup">
				<Signup />
			</Route>
			<Route exact path="/create">
				<CreatePost />
			</Route>
		</BrowserRouter>
	);
};

export default App;
