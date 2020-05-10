import { GET_ALL_WARDS, CREATE_WARDS, EDIT_WARDS, DELETE_WARDS, SET_LOADING, CLEAR_ERRORS, REQUEST_FAIL } from "../types";

export default (state, action) => {
    switch(action.type){
        case GET_ALL_WARDS:
            return {
                ...state,
                wards: action.payload,
                loading: false
            }
        case CREATE_WARDS:
            return {
                ...state,
                wards: [...state.wards, {...action.payload}],
                loading: false
            }
        case EDIT_WARDS:
            const edited = state.wards.map(item => {
                if(item.id === action.payload.id){
                    return item = action.payload;
                }
                return item;
            });
            return {
                ...state,
                wards: edited,
                loading: false
            }
        case DELETE_WARDS:
            const deleted = state.wards.filter(item => item.id !== action.payload);
            return {
                ...state,
                wards: deleted,
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
                metroErrors: null
            }
        case REQUEST_FAIL:
            return {
                ...state,
                metroErrors: action.payload
            }
        default:
            return state;
    }
}