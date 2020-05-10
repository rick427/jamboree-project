import {GET_ALL_PROVINCE, REQUEST_FAIL, EDIT_PROVINCE, CLEAR_ERRORS, SET_LOADING, DELETE_PROVINCE, CREATE_PROVINCE} from '../types';


const ProvinceReducer = (state, action) => {
    switch(action.type){
        case GET_ALL_PROVINCE:
            return {
                ...state,
                loading: false,
                provinces: action.payload,
            }
        case CREATE_PROVINCE:
            const created = [...state.provinces, {...action.payload}]
            return {
                ...state,
                loading: false,
                provinces: created
            }
        case EDIT_PROVINCE:
            const edited = state.provinces.map(item => {
                if(item.id === action.payload.id){
                    return item = action.payload;
                }
                return item;
            });
            return {
                ...state,
                loading: false,
                provinces: edited
            }
        case DELETE_PROVINCE:
            const deleted = state.provinces.filter(item => item.id !== action.payload);
            return {
                ...state,
                loading: false,
                provinces: deleted
            }
        case REQUEST_FAIL:
            return {
                ...state,
                loading: false,
                provinceError: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                provinceError: null
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}

export default ProvinceReducer;

