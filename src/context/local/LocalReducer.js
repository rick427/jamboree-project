import { GET_ALL_DISTRICTS, REQUEST_FAIL, CREATE_DISTRICT, EDIT_DISTRICT, DELETE_DISTRICT, SET_LOADING, CLEAR_ERRORS } from "../types";

export default (state, action) => {
    switch(action.type){
        case GET_ALL_DISTRICTS:
            return {
                ...state,
                locals: action.payload,
                loading: false
            }
        case CREATE_DISTRICT:
            return {
                ...state,
                locals: [...state.locals, {...action.payload}]
            }
        case EDIT_DISTRICT:
            const edited = state.locals.map(item => {
                if(item.id === action.payload.id){
                    return item = action.payload;
                }
                return item;
            });
            return {
                ...state,
                locals: edited,
                loading: false
            }
        case DELETE_DISTRICT:
            const deleted = state.locals.filter(item => item.id !== action.payload);
            return {
                ...state,
                locals: deleted,
                loading: false
            }
        case REQUEST_FAIL:
            return {
                ...state,
                localError: action.payload,
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                localError: null
            }
        default:
            return state;
    }
}