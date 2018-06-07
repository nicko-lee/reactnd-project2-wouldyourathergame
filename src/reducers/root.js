import {
    MOCK_TYPE,
    ANOTHER_TYPE,
    LOGIN,
    LOGOUT,
    GET_USERS,
    GET_QUESTIONS
} from '../actions/root';
import { combineReducers } from 'redux';

// REDUCERS
export const mockReducer = (state = 0, { type, value }) => {
    switch(type) {
        case MOCK_TYPE:
            return value + 100;
        default:   
            return state;
    }
};

export const anotherReducer = (state = 0, { type, value }) => {
    switch(type) {
        case ANOTHER_TYPE:
            return value - 100;
        default:   
            return state;
    }
};

export const authReducer = (state = false, { type, value }) => {
    switch(type) {
        case LOGIN:
            return true;
        case LOGOUT:
            return false;
        default:   
            return state;
    }
};

export const usersReducer = (state = {}, { type, value }) => {
    switch(type) {
        case GET_USERS:
            return value;
        default:   
            return state;
    }
};

export const questionsReducer = (state = {}, { type, value }) => {
    switch(type) {
        case GET_QUESTIONS:
            return value;
        default:   
            return state;
    }
};


// ALL COMES TOGETHER HERE - THIS IS YOUR "STORE"
export default combineReducers({
    authedUser: authReducer,
    users: usersReducer,
    questions: questionsReducer,
    mock: mockReducer,
    another: anotherReducer
});