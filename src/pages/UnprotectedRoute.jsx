import React from 'react';
import { Route } from 'react-router-dom';

const UnprotectedRoute = ({ component: Component, ...rest }) => {    
    return (
        <Route
            key={rest.path}
            path={rest.path}
            element={Component}
        />
    );
};

export default UnprotectedRoute;
