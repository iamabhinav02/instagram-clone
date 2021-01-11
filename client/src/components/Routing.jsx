import React, { useEffect, useContext } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { UserContext } from "../App";

import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import CreatePost from "../screens/CreatePost";
import UserProfile from "../screens/UserProfile";
import FollowingPosts from "../screens/FollowingPosts";
import Reset from "../screens/Reset";
import NewPassword from "../screens/NewPassword";

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
		<main>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/following" component={FollowingPosts} />
				<Route
					exact
					path="/profile/:userId"
					children={props => (
						<UserProfile {...props} key={Date.now()} />
					)}
				/>
				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={Signup} />
				<Route exact path="/reset" component={Reset} />
				<Route exact path="/reset/:token" component={NewPassword} />
				<Route exact path="/createpost" component={CreatePost} />
				<Route exact path="/profile" component={Profile} />
			</Switch>
		</main>
	);
};

export default Routing;
