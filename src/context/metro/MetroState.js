import React, {useReducer} from 'react';
import MetroContext from './MetroContext';
import metroReducer from './MetroReducer';
import axios from 'axios';
import {GET_ALL_METROS, CREATE_METRO, EDIT_METRO, DELETE_METRO, REQUEST_FAIL, CLEAR_ERRORS, SET_LOADING} from '../types'

const MetroState = props => {
    const initialState = {
        metros: [],
        loading: true,
        metroErrors: null,
        alert: ''
    }
    const [state, dispatch] = useReducer(metroReducer, initialState);

    //@: GET ALL METROS
    const getMetros = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/metropolitan-municipalities`);
            dispatch({
                type: GET_ALL_METROS,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: REQUEST_FAIL,
                payload: error.response.data.title
            })   
        }
    }

    //@: CREATE METRO
    const createMetros = async formValues => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/metropolitan-municipalities`, formValues);
            dispatch({
                type: CREATE_METRO,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: REQUEST_FAIL,
                payload: error.response.data.title
            });
        }
    }

    //@: EDIT METRO
    const editMetro = async (formValues) => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/metropolitan-municipalities`, formValues);
            dispatch({
                type: EDIT_METRO,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: REQUEST_FAIL,
                payload: error.response.data.title
            })
        }
    }

    //@: DELETE METRO
    const deleteMetro = async id => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/metropolitan-municipalities/${id}`);
            dispatch({
                type: DELETE_METRO,
                payload: id
            })
        } catch (error) {
            dispatch({
                type: REQUEST_FAIL,
                payload: error.response.data.title
            })
        }
    }
    
    //@: CLEAR ERRORS
    const clearErrors = () => dispatch({type: CLEAR_ERRORS});

    //@: SET LOADING
    const setLoading = () => dispatch({type: SET_LOADING});

    return (
        <MetroContext.Provider
            value={{
                metros: state.metros,
                error: state.metroErrors,
                loading: state.loading,
                getMetros,
                createMetros,
                editMetro,
                deleteMetro,
                clearErrors,
                setLoading
            }}
        >
            {props.children}
        </MetroContext.Provider>
    )
}

export default MetroState
