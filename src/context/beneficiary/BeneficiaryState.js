import React, {useReducer} from 'react';
import BeneficiaryContext from './BeneficiaryContext';
import beneficiaryReducer from './beneficiaryReducer';
import axios from 'axios';
import { GET_ALL_BENEFICIARY, CREATE_BENEFICIARY, EDIT_BENEFICIARY, DELETE_BENEFICIARY, CLEAR_ERRORS, SET_LOADING, REQUEST_FAIL } from '../types';

const BeneficiaryState = props => {
    const initialState = {
        beneficiaries: null,
        beneficairyError: null,
        loading: true
    }

    const [state, dispatch] = useReducer(beneficiaryReducer, initialState);

    //@: GET ALL BENEFICIARIES
    const getBeneficiaries = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/beneficiaries`);
            dispatch({
                type: GET_ALL_BENEFICIARY,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: REQUEST_FAIL,
                payload: error.response.data.title
            })   
        }
    }

    //@: CREATE BENEFICIARIES
    const createBeneficiary = async (formValues) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/beneficiaries`, formValues);
            dispatch({
                type: CREATE_BENEFICIARY,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: REQUEST_FAIL,
                payload: error.response.data.title
            })   
        }
    }

    //@: EDIT BENEFICIARIES
    const editBeneficiary = async (formValues) => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/beneficiaries`, formValues);
            dispatch({
                type: EDIT_BENEFICIARY,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: REQUEST_FAIL,
                payload: error.response.data.title
            })   
        }
    }

    //@: DELETE BENEFICIARIES
    const deleteBeneficiary = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/beneficiaries/${id}`);
            dispatch({
                type: DELETE_BENEFICIARY,
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
        <BeneficiaryContext.Provider
            value={{
                beneficiaries: state.beneficiaries,
                error: state.beneficairyError,
                loading: state.loading,
                getBeneficiaries,
                createBeneficiary,
                editBeneficiary,
                deleteBeneficiary,
                setLoading,
                clearErrors
            }}
        >
            {props.children}
        </BeneficiaryContext.Provider>
    )
}

export default BeneficiaryState
