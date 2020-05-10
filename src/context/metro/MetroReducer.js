import {GET_ALL_METROS, CREATE_METRO, EDIT_METRO, DELETE_METRO, CLEAR_ERRORS, SET_LOADING, REQUEST_FAIL} from '../types'

const metroReducer = (state, action) => {
    switch(action.type){
        case GET_ALL_METROS:
            return {
                ...state,
                metros: action.payload,
                loading: false
            }
        case CREATE_METRO:
            return {
                ...state,
                metros: [...state.metros, {...action.payload}]
            }
        case EDIT_METRO:
            const edited = state.metros.map(item => {
                if(item.id === action.payload.id){
                    return item = action.payload;
                }
                return item;
            });
            return {
                ...state,
                loading: false,
                metros: edited
            }
        case DELETE_METRO:
            const deleted = state.metros.filter(item => item.id !== action.payload);
            return {
                ...state,
                loading: false,
                metros: deleted
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

export default metroReducer;