import {
    LOGIN,
    LOGOUT,
    GET_USERS,
    GET_QUESTIONS,
    ADD_QUESTION,
    ADD_QUESTION_TO_USER,
    ADD_ANSWER_TO_USER,
    ADD_ANSWER_TO_QUESTION,
    SET_REDIRECT_URL,
    CLEAR_REDIRECT_URL
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

export const redirectReducer = (state = "", { type, value }) => {
    switch(type) {
        case SET_REDIRECT_URL:
            return value;
        case CLEAR_REDIRECT_URL:
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
        case ADD_ANSWER_TO_USER:
            return {
                ...state,
                [value.authedUser]: {
                    ...state[value.authedUser],
                        answers: {
                            ...state[value.authedUser].answers,
                            [value.qid]: value.answer 
                    }
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
        case ADD_ANSWER_TO_QUESTION:
            return {
                ...state,
                    [value.qid]: {
                        ...state[value.qid],
                            [value.answer]: {
                                ...state[value.qid][value.answer],
                                votes: [
                                    ...state[value.qid][value.answer].votes,
                                    value.authedUser
                                ]
                            }
                    } 
            };
        default:   
            return state;
    }
};


// ALL COMES TOGETHER HERE - THIS IS YOUR "STORE"
export default combineReducers({
    authedUser: authReducer,
    redirectUrl: redirectReducer,
    loadingBar: loadingBarReducer,
    users: usersReducer,
    questions: questionsReducer
});