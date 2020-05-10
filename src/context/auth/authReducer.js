import { 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    USER_LOADED, 
    AUTH_ERROR, 
    CLEAR_ERRORS, 
    SET_LOADING, 
    LOGOUT 
} from "../types";

export default (state, action) => {
    switch(action.type){
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.id_token);
            return {
                ...state,
                token: action.payload.id_token,
                isAuthenticated: true,
                loading: false,
            };

        case LOGIN_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: action.payload,
                user: null
            }
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: null,
                user: null
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state;
    }
}