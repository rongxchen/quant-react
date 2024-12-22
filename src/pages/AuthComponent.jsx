import { isAuthenticated } from "../utils/auth_util";
import { Navigate } from "react-router-dom";

export default function AuthComponent(component) {
    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }
    return component;
}
