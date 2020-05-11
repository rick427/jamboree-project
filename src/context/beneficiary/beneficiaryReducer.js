import { GET_ALL_BENEFICIARY, CREATE_BENEFICIARY, EDIT_BENEFICIARY, DELETE_BENEFICIARY, CLEAR_ERRORS, SET_LOADING, REQUEST_FAIL } from '../types';

export default (state, action) => {
    switch(action.type){
        case GET_ALL_BENEFICIARY:
            return {
                ...state,
                beneficiaries: action.payload,
                loading: false
            }
        case CREATE_BENEFICIARY:
            return {
                ...state,
                beneficiaries: [...state.beneficiaries, {...action.payload}],
                loading: false
            }
        case EDIT_BENEFICIARY:
            const edited = state.beneficiaries.map(item => {
                if(item.id === action.payload.id){
                    return item = action.payload;
                }
                return item;
            });
            return {
                ...state,
                beneficiaries: edited,
                loading: false
            }
        case DELETE_BENEFICIARY:
            const deleted = state.beneficiaries.filter(item => item.id !== action.payload);
            return {
                ...state,
                beneficiaries: deleted,
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
                beneficairyError: null
            }
        case REQUEST_FAIL:
            return {
                ...state,
                beneficairyError: action.payload
            }
        default:
            return state;
    }
}