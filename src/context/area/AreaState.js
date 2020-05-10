import React, {useReducer} from 'react';
import AreaContext from './AreaContext';
import areaReducer from './areaReducer';
import axios from 'axios';
import { GET_ALL_AREAS, CREATE_AREA, EDIT_AREA, DELETE_AREA, CLEAR_ERRORS, REQUEST_FAIL, SET_LOADING } from '../types';

const AreaState = props => {
    const initialState = {
        areas: null,
        areaError: null,
        loading: true,
    }
    const [state, dispatch] = useReducer(areaReducer, initialState);

    //@: GET ALL AREAS
    const getAreas = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/areas`);
            dispatch({
                type: GET_ALL_AREAS,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: REQUEST_FAIL,
                payload: error.response.data.title
            })   
        }
    }

    //@: CREATE AREA
    const createArea = async (formValues) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/areas`, formValues);
            dispatch({
                type: CREATE_AREA,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: REQUEST_FAIL,
                payload: error.response.data.title
            })   
        }
    }

    //@: EDIT AREA
    const editArea = async (formValues) => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/areas`, formValues);
            dispatch({
                type: EDIT_AREA,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: REQUEST_FAIL,
                payload: error.response.data.title
            })   
        }
    }

    //@: DELETE AREA
    const deleteArea = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/areas/${id}`);
            dispatch({
                type: DELETE_AREA,
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
        <AreaContext.Provider
            value={{
                areas: state.areas,
                loading: state.loading,
                error: state.areaError,
                getAreas,
                createArea,
                editArea,
                deleteArea,
                setLoading,
                clearErrors
            }}
        >
            {props.children}
        </AreaContext.Provider>
    )
}

export default AreaState
