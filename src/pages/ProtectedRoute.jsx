import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth_util';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            key={rest.path}
            path={rest.path}
            element={
                isAuthenticated() ? (
                    Component
                ) : (
                    <Navigate to="/login" />
                )
            }
        />
    );
};

export default ProtectedRoute;
