import { GET_ALL_AREAS, CREATE_AREA, EDIT_AREA, DELETE_AREA, CLEAR_ERRORS, REQUEST_FAIL, SET_LOADING } from '../types';


export default (state, action) => {
    switch(action.type){
        case GET_ALL_AREAS:
            return {
                ...state,
                areas: action.payload,
                loading: false
            }
        case CREATE_AREA:
            return {
                ...state,
                areas: [...state.areas, {...action.payload}],
                loading: false
            }
        case EDIT_AREA:
            const edited = state.areas.map(item => {
                if(item.id === action.payload.id){
                    return item = action.payload;
                }
                return item;
            });
            return {
                ...state,
                areas: edited,
                loading: false
            }
        case DELETE_AREA:
            const deleted = state.areas.filter(item => item.id !== action.payload);
            return {
                ...state,
                areas: deleted,
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
                areaError: null
            }
        case REQUEST_FAIL:
            return {
                ...state,
                areaError: action.payload
            }
        default:
            return state;
    }
}