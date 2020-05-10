import React, {useReducer} from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    USER_LOADED, 
    AUTH_ERROR, 
    // REGISTER_SUCCESS, 
    // REGISTER_FAIL, 
    CLEAR_ERRORS, 
    SET_LOADING,
    LOGOUT
} from '../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: false,
        error: null,
        user: null,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);


    const loadUser = async () => {
        // @load token into global header
        if(localStorage.token) setAuthToken(localStorage.token);

        try {
            const res = await axios.get('https://jamboree.pesawise.com/api/account');
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
            
        } catch (error) {
            dispatch({type: AUTH_ERROR, payload: error.response.data.detail})
        }
    }

    // Register user
    // const register = async formData => {
    //     const config = {
    //         headers: {'Content-type': 'application/json'}
    //     };

    //     try {
    //         const res = await axios.post('/api/authenticate', formData, config);
    //         dispatch({
    //             type: REGISTER_SUCCESS,
    //             payload: res
    //         });
    //         //loadUser();
    //     } catch (error) {
    //         dispatch({
    //             type: REGISTER_FAIL,
    //             payload: error.res
    //         })
    //     }
    // }

    // Login user
    const login = async formData => {
        const config = {
            headers: {'Content-type': 'application/json'}
        };

        try {
            const res = await axios.post('https://jamboree.pesawise.com/api/authenticate', formData, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            loadUser();
        } catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.detail
            })
        }
    }

    // Logout
    const logout = () => dispatch({type: LOGOUT});

    // Clear errors
    const clearErrors = () => dispatch({type: CLEAR_ERRORS});

    //Set Loading
    const setLoading = val => dispatch({type: SET_LOADING, payload: val})

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                login,
                logout,
                loadUser,
                clearErrors,
                setLoading,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;