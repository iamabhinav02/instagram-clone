import React, { createContext, Fragment, useEffect, useReducer } from "react";
import { BrowserRouter, Route, useHistory } from "react-router-dom";

import "./App.css";
import NavBar from "./components/Navbar";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import CreatePost from "./screens/CreatePost";
import { initialState, reducer } from "./store/reducer/userReducer";

export const UserContext = createContext();

const Routing = () => {
	const history = useHistory();
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user) {
			history.push("/");
		} else {
			history.push("/login");
		}
	}, []);

	return (
		<Fragment>
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
			<Route exact path="/createpost">
				<CreatePost />
			</Route>
		</Fragment>
	);
};

const App = () => {
	const { state, dispatch } = useReducer(reducer, initialState);

	return (
		<UserContext.Provider value={{ state, dispatch }}>
			<BrowserRouter>
				<NavBar />
				<Routing />
			</BrowserRouter>
		</UserContext.Provider>
	);
};

export default App;
