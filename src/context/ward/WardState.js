import React, {useReducer} from 'react';
import WardContext from './WardContext';
import wardReducer from './wardReducer';
import axios from 'axios';
import {GET_ALL_WARDS, CREATE_WARDS, EDIT_WARDS, DELETE_WARDS, REQUEST_FAIL, CLEAR_ERRORS, SET_LOADING} from '../types'

const WardState = props => {
    const initialState = {
        wards: [],
        loading: true,
        wardErrors: null,
    }
    const [state, dispatch] = useReducer(wardReducer, initialState);

    //@: GET ALL WARDS
    const getWards = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/wards`);
            dispatch({
                type: GET_ALL_WARDS,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: REQUEST_FAIL,
                payload: error.response.data.title
            })   
        }
    }

    //@: CREATE WARDS
    const createWard = async formValues => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/wards`, formValues);
            dispatch({
                type: CREATE_WARDS,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: REQUEST_FAIL,
                payload: error.response.data.title
            });
        }
    }

    //@: EDIT WARDS
    const editWard = async (formValues) => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/wards`, formValues);
            dispatch({
                type: EDIT_WARDS,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: REQUEST_FAIL,
                payload: error.response.data.title
            })
        }
    }

    //@: DELETE WARDS
    const deleteWard = async id => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/wards/${id}`);
            dispatch({
                type: DELETE_WARDS,
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
        <WardContext.Provider
            value={{
                wards: state.wards,
                error: state.wardErrors,
                loading: state.loading,
                getWards,
                createWard,
                editWard,
                deleteWard,
                clearErrors,
                setLoading
            }}
        >
            {props.children}
        </WardContext.Provider>
    )
}
export default WardState;
