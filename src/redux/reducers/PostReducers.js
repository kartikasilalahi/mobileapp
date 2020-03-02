import { 
    HOME_REFRESHING,
    FILL_POST_LIST
} from '../actions/types';

const INITIAL_STATE = {
    homeRefreshing: false,
    postList: []
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case HOME_REFRESHING : 
            return { ...state, homeRefreshing: true }
        case FILL_POST_LIST :
            return { ...state, postList: action.payload, homeRefreshing: false }
        default :
            return state;
    }
}