import React, {useReducer} from 'react';
import DeviceContext from './DeviceContext';
import deviceReducer from './deviceReducer';
import axios from 'axios';
import { GET_ALL_DEVICES, CREATE_DEVICES, DELETE_DEVICES, EDIT_DEVICES, REQUEST_FAIL, CLEAR_ERRORS, SET_LOADING } from '../types';

const DeviceState = props => {
    const initialState = {
        devices: null,
        deviceError: null,
        loading: false
    }

    const [state, dispatch] = useReducer(deviceReducer, initialState);

    //@: GET ALL DEVICES
    const getDevices = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/devices`);
            dispatch({
                type: GET_ALL_DEVICES,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: REQUEST_FAIL,
                payload: error.response.data.title
            })   
        }
    }

    //@: CREATE DEVICES
    const createDevices = async (formValues) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/devices`, formValues);
            dispatch({
                type: CREATE_DEVICES,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: REQUEST_FAIL,
                payload: error.response.data.title
            })   
        }
    }

    //@: EDIT DEVICES
    const editDevices = async (formValues) => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/devices`, formValues);
            dispatch({
                type: EDIT_DEVICES,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: REQUEST_FAIL,
                payload: error.response.data.title
            })   
        }
    }

    //@: DELETE DEVICES
    const deleteDevices = async (id) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/devices/${id}`);
            dispatch({
                type: DELETE_DEVICES,
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
        <DeviceContext.Provider
            value={{
                devices: state.devices,
                error: state.deviceError,
                loading: state.loading,
                getDevices,
                createDevices,
                editDevices,
                deleteDevices,
                clearErrors,
                setLoading
            }}
        >
            {props.children}
        </DeviceContext.Provider>
    )
}

export default DeviceState;
