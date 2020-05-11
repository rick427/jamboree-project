import { GET_ALL_DEVICES, CREATE_DEVICES, DELETE_DEVICES, EDIT_DEVICES, REQUEST_FAIL, CLEAR_ERRORS, SET_LOADING } from '../types';

export default (state, action) => {
    switch(action.type){
        case GET_ALL_DEVICES:
            return {
                ...state,
                devices: action.payload,
                loading: false
            }
        case CREATE_DEVICES:
            return {
                ...state,
                devices: [...state.devices, {...action.payload}],
                loading: false
            }
        case EDIT_DEVICES:
            const edited = state.devices.map(item => {
                if(item.id === action.payload.id){
                    return item = action.payload;
                }
                return item;
            });
            return {
                ...state, 
                devices: edited,
                loading: false
            }
        case DELETE_DEVICES:
            const deleted = state.devices.filter(item => item.id !== action.payload);
            return {
                ...state,
                devices: deleted,
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
                deviceError: null
            }
        case REQUEST_FAIL:
            return {
                ...state,
                deviceError: action.payload
            }
        default:
            return state;
    }
}