import React, {useReducer} from 'react';
import LocalContext from './LocalContext';
import LocalReducer from './LocalReducer';
import axios from 'axios';
import {GET_ALL_DISTRICTS, CREATE_DISTRICT, EDIT_DISTRICT, DELETE_DISTRICT, REQUEST_FAIL, SET_LOADING, CLEAR_ERRORS} from '../types';

const LocalState = props => {
    const initialState = {
        locals: null,
        localError: null,
        loading: true
    }

    const [state, dispatch] = useReducer(LocalReducer, initialState);

    const getLocals = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/district-municipalities`);
            dispatch({
                type: GET_ALL_DISTRICTS,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: REQUEST_FAIL,
                payload: error.response.data.title
            })
        }
    }

    const createLocals = async (formValues) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/district-municipalities`, formValues);
            dispatch({
                type: CREATE_DISTRICT,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: REQUEST_FAIL,
                payload: error.response.data.title
            })
        }
    }

    const editLocals = async (formValues) => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/district-municipalities`, formValues);
            dispatch({
                type: EDIT_DISTRICT,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: REQUEST_FAIL,
                payload: error.response.data.title
            })
        }
    }

    const deleteLocals = async (id) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/district-municipalities/${id}`);
            dispatch({
                type: DELETE_DISTRICT,
                payload: id
            });
        } catch (error) {
            dispatch({
                type: REQUEST_FAIL,
                payload: error.response.data.title
            })
        }
    }

    const setLoading = () => dispatch({ type: SET_LOADING});

    const clearErrors = () => dispatch({type: CLEAR_ERRORS});

    return (
        <LocalContext.Provider
            value={{
                locals: state.locals,
                error: state.localError,
                loading: state.loading,
                getLocals,
                createLocals,
                editLocals,
                deleteLocals,
                setLoading,
                clearErrors
            }}
        >
            {props.children}
        </LocalContext.Provider>
    )
}

export default LocalState;
