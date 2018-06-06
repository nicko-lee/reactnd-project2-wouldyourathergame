import {
    MOCK_TYPE,
    ANOTHER_TYPE
} from '../actions/root';
import { combineReducers } from 'redux';

// REDUCERS
export const mockReducer =(state =[], { type, value }) => {
    switch(type) {
        case MOCK_TYPE:
            return value + 100;
        default:   
            return state;
    }
};

export const anotherReducer =(state =[], { type, value }) => {
    switch(type) {
        case ANOTHER_TYPE:
            return value - 100;
        default:   
            return state;
    }
};

// ALL COMES TOGETHER HERE - THIS IS YOUR "STORE"
export default combineReducers({
    mock: mockReducer,
    another: anotherReducer
});