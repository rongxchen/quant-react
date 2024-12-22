import React from "react";
import { Routes } from "react-router-dom";
import "./App.css";
import routes from "./routes";
import UnprotectedRoute from "./pages/UnprotectedRoute.jsx";
import { ConfigProvider } from "antd";
import AuthComponent from "./pages/AuthComponent.jsx";

export default function App() {
  const buildRoute = (route) => {
    if (route.isPrivate) {
      return UnprotectedRoute({component: AuthComponent(route.component), path: route.path});
    }
    return UnprotectedRoute({component: route.component, path: route.path});
  }

  return (
    <>
      <ConfigProvider
      ></ConfigProvider>
      <Routes>
        {routes.map((route) => {
          return buildRoute(route);
        })}
      </Routes>
    </>
  );
}
