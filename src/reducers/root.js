import {
    LOGIN,
    LOGOUT,
    GET_USERS,
    GET_QUESTIONS,
    ADD_QUESTION,
    ADD_QUESTION_TO_USER
} from '../actions/root';
import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';

// REDUCERS

export const authReducer = (state = "", { type, value }) => {
    switch(type) {
        case LOGIN:
            return value;
        case LOGOUT:
            return value;
        default:   
            return state;
    }
};

export const usersReducer = (state = {}, { type, value }) => {
    switch(type) {
        case GET_USERS:
            return value;
        case ADD_QUESTION_TO_USER:
            return {
                ...state,
                [value.user]: {
                    ...state[value.user],
                        questions: [
                            ...state[value.user].questions,
                            value.questionId
                        ]
                    }
                }
        default:   
            return state;
        }
    };

export const questionsReducer = (state = {}, { type, value }) => {
    switch(type) {
        case GET_QUESTIONS:
            return value;
        case ADD_QUESTION:
            return { ...state, [value.id]: value };
        default:   
            return state;
    }
};


// ALL COMES TOGETHER HERE - THIS IS YOUR "STORE"
export default combineReducers({
    authedUser: authReducer,
    loadingBar: loadingBarReducer,
    users: usersReducer,
    questions: questionsReducer
});