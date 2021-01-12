import React, { createContext, Fragment, useReducer } from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import NavBar from "./components/Navbar";
import Routing from "./components/Routing";
import { initialState, reducer } from "./store/reducer/userReducer";

export const UserContext = createContext();

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<UserContext.Provider value={{ state, dispatch }}>
			<BrowserRouter>
				<Fragment>
					<NavBar />
					<div className="container">
						<Routing />
					</div>
				</Fragment>
			</BrowserRouter>
		</UserContext.Provider>
	);
};

export default App;
