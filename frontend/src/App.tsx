import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Default from "./pages/Default";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";

const App = () => {
	return(
		<BrowserRouter>
			<Routes>
				<Route 
					path="/"
					element={<Default />}
				/>
				<Route 
					path='/login'
					element={<Login />}
				/>
				<Route 
					path='/unauthorized'
					element={<Unauthorized />}
				/>

				<Route element={<ProtectedRoute allowedRoles={['ADMIN']}/>}>
					<Route 
						path='/protected'
						element={<h1>Protected</h1>}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;