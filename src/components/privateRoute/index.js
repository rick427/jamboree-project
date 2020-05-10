import React from 'react';
import {Route, Redirect} from 'react-router-dom';
// import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({component: Component, ...rest}) => {
    // const authContext = useContext(AuthContext);
    // const {isAuthenticated, loading} = authContext;

    return (
        <Route {...rest} render={props => localStorage.token ? (
            <Component {...props} />
            ) : (
            <Redirect to={{pathname: '/login', state: {from: props.location}}} />
        )} />
    )
}

export default PrivateRoute
