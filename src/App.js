import React from "react";
import { Routes } from "react-router-dom";
import "./App.css";
import routes from "./routes";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import UnprotectedRoute from "./pages/UnprotectedRoute.jsx";
import { ConfigProvider } from "antd";

export default function App() {
  const buildRoute = (route) => {
    if (route.isPrivate) {
      return ProtectedRoute({component: route.component, path: route.path});
    }
    return UnprotectedRoute({component: route.component, path: route.path});
  }

  return (
    <>
      <ConfigProvider
      ></ConfigProvider>
      <Routes>
        {routes.map((route) => {
          const r = buildRoute(route);
          return r;
        })}
        {/* <Route path="/" element={isAuth ? <ProfilePage /> : <HomePage />} />
        <Route path="/login" element={isAuth ? <ProfilePage /> : <LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={isAuth ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/404" element={<PageNotFound/>} />
        <Route path="*" element={<Navigate to="/404" />} /> */}
      </Routes>
    </>
  );
}
