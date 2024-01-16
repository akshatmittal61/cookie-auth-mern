import React from "react";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

const protectedRoutes = [
	{
		path: "/dashboard",
		component: <Dashboard />,
	},
];

const nonProtectedRoutes = [
	{
		path: "/",
		component: <Home />,
	},
	{
		path: "/login",
		component: <Login />,
	},
	{
		path: "*",
		component: <NotFound />,
	},
];

const routes = protectedRoutes
	.map((route) => ({
		...route,
		component: <PrivateRoute>{route.component}</PrivateRoute>,
	}))
	.concat(nonProtectedRoutes);

export default routes;
