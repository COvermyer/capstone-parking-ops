import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import Default from "./pages/Default";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import Test from "./pages/Test";

const App = () => {
	return(
		<BrowserRouter>
			<Routes>
				<Route 
					path="/"
					element={<Default />}
				/>
				<Route 
					path="/test"
					element={<Test />}
				/>
				<Route 
					path='/login'
					element={<LoginPage />}
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