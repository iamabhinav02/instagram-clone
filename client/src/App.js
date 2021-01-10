import React, {
	createContext,
	Fragment,
	useContext,
	useEffect,
	useReducer,
} from "react";
import { BrowserRouter, Route, useHistory } from "react-router-dom";

import "./App.css";
import NavBar from "./components/Navbar";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import CreatePost from "./screens/CreatePost";
import UserProfile from "./screens/UserProfile";
import FollowingPosts from "./screens/FollowingPosts";
import Reset from "./screens/Reset";
import NewPassword from "./screens/NewPassword";
import { initialState, reducer } from "./store/reducer/userReducer";

export const UserContext = createContext();

const Routing = () => {
	const history = useHistory();
	const { dispatch } = useContext(UserContext);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user) {
			dispatch({ type: "USER", payload: user });
		} else {
			if (!history.location.pathname.startsWith("/reset"))
				history.push("/login");
		}
	}, []);

	return (
		<Fragment>
			<Route exact path="/">
				<Home />
			</Route>
			<Route exact path="/following">
				<FollowingPosts />
			</Route>
			<Route exact path="/profile">
				<Profile />
			</Route>
			<Route exact path="/profile/:userId">
				<UserProfile />
			</Route>
			<Route exact path="/login">
				<Login />
			</Route>
			<Route exact path="/signup">
				<Signup />
			</Route>
			<Route exact path="/reset">
				<Reset />
			</Route>
			<Route exact path="/reset/:token">
				<NewPassword />
			</Route>
			<Route exact path="/createpost">
				<CreatePost />
			</Route>
		</Fragment>
	);
};

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

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
