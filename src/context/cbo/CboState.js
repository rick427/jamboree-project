import React, {useReducer} from 'react';
import CboContext from './CboContext';
import cboReducer from './cboReducer';
import axios from 'axios';
import { GET_ALL_CBOS, GET_CBO_BY_ID, REQUEST_FAIL, EDIT_CBO, DELETE_CBO, CREATE_CBO, CLEAR_ERRORS, SET_LOADING } from '../types';

const CboState = props => {
    const initialState = {
        cbos: null,
        cbo: null,
        cboErrors: null,
        loading: true
    }

    const [state, dispatch] = useReducer(cboReducer, initialState);

    //@: GET ALL CBOS
    const getCbos = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/cbos`);
            dispatch({
                type: GET_ALL_CBOS,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: REQUEST_FAIL,
                payload: error.response.data.title
            })
        }
    }

    //@: GET CBO BY ID
    const getCboById = async (id) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/cbos/${id}`);
            dispatch({
                type: GET_CBO_BY_ID,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: REQUEST_FAIL,
                payload: error.response.data.title
            })
        }
    }

    //@: CREATE CBOS
    const createCbo = async (formValues) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/cbos`, formValues);
            dispatch({
                type: CREATE_CBO,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: REQUEST_FAIL,
                payload: error.response.data.title
            })
        }
    }

    //@: EDIT CBO
    const editCbo = async (formValues) => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/cbos`, formValues);
            dispatch({
                type: EDIT_CBO,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: REQUEST_FAIL,
                payload: error.response.data.title
            })
        }
    }

    //@: DELETE CBO
    const deleteCbo = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/cbos/${id}`);
            dispatch({
                type: DELETE_CBO,
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
        <CboContext.Provider
            value={{
                cbos: state.cbos,
                cbo: state.cbo,
                loading: state.loading,
                error: state.cboErrors,
                getCbos,
                getCboById,
                createCbo,
                editCbo,
                deleteCbo,
                setLoading,
                clearErrors
            }}
        >
            {props.children}
        </CboContext.Provider>
    )
}
export default CboState;
