import React, {useReducer} from 'react';
import axios from 'axios';
import ProvinceContext from './provinceContext';
import ProvinceReducer from './provinceReducer';
import {GET_ALL_PROVINCE, REQUEST_FAIL, CREATE_PROVINCE, EDIT_PROVINCE, CLEAR_ERRORS, DELETE_PROVINCE, SET_LOADING} from '../types';
//import { toast, Bounce } from 'react-toastify';

const ProvinceState = props => {
    const initialState = {
        provinces: [],
        loading: true,
        provinceError: null,
    };

    const [state, dispatch] = useReducer(ProvinceReducer, initialState);

    //@ GET ALL PROVINCE
    const getProvinces = async () => {    
        const config = {header:{'Content-Type': 'application/json'}}  
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/provinces`, config);
            dispatch({
                type: GET_ALL_PROVINCE,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: REQUEST_FAIL,
                payload: error.response.data.title
            })
        }
    }

    //@: CREATE PROVINCE
    const createProvince = async (formValues) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/provinces`, formValues);
            dispatch({
                type: CREATE_PROVINCE,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: REQUEST_FAIL,
                payload: error.response.data.title
            })
        }
    }

    //@: EDIT PROVINCE
    const editProvince = async (formValues) => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/provinces`, formValues);
            dispatch({
                type: EDIT_PROVINCE,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: REQUEST_FAIL,
                payload: error.response.data.title
            })
        }
    }

    //@: DELETE PROVINCE
    const deleteProvince = async id => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/provinces/${id}`);
            dispatch({
                type: DELETE_PROVINCE,
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
        <ProvinceContext.Provider
            value={{
                provinces: state.provinces,
                loading: state.loading,
                error: state.provinceError,
                getProvinces,
                createProvince,
                editProvince,
                deleteProvince,
                clearErrors,
                setLoading
            }}    
        >
            {props.children}
        </ProvinceContext.Provider>
    )
}

export default ProvinceState;
