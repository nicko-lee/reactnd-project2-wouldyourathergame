import {
    LOGIN,
    LOGOUT,
    GET_USERS,
    GET_QUESTIONS
} from '../actions/root';
import { combineReducers } from 'redux';

// REDUCERS

export const authReducer = (state = "", { type, value }) => {
    switch(type) {
        case LOGIN:
            return value;
        case LOGOUT:
            return null;
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
    questions: questionsReducer
});