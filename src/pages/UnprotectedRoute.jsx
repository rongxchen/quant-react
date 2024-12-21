import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth_util';

const UnprotectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            key={rest.path}
            path={rest.path}
            element={
                isAuthenticated() && ["/", "/login"].includes(rest.path) ? (
                    <Navigate to={"/profile"} />
                ) : (
                    Component
                )
            }
        />
    );
};

export default UnprotectedRoute;
