import { GET_ALL_CBOS, REQUEST_FAIL, EDIT_CBO, DELETE_CBO, CREATE_CBO, CLEAR_ERRORS, SET_LOADING, GET_CBO_BY_ID } from '../types';

export default (state, action) => {
    switch(action.type){
        case GET_ALL_CBOS:
            return {
                ...state,
                cbos: action.payload,
                loading: false
            }
        case GET_CBO_BY_ID:
            return {
                ...state,
                cbo: action.payload,
                loading: false
            }
        case CREATE_CBO:
            return {
                ...state,
                cbos: [...state.cbos, {...action.payload}],
                loading: false
            }
        case EDIT_CBO:
            const edited = state.cbos.map(item => {
                if(item.id === action.payload.id){
                    return item = action.payload;
                }
                return item;
            });
            return {
                ...state,
                cbos: edited,
                loading: false
            }
        case DELETE_CBO:
            const deleted = state.cbos.filter(item => item.id !== action.payload);
            return {
                ...state,
                cbos: deleted,
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case CLEAR_ERRORS:
            return  {
                ...state,
                cboErrors: null
            }
        case REQUEST_FAIL:
            return {
                ...state,
                cboErrors: action.payload
            }
        default:
            return state;
    }
};