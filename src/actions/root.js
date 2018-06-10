// ACTION TYPES
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const GET_USERS = "GET_USERS";
export const GET_QUESTIONS = "GET_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_QUESTION_TO_USER = "ADD_QUESTION_TO_USER";


// ACTION CREATORS

export const logout = () => ({
    type: LOGOUT,
    value: ""
})

export const login = (selectedUser) => ({
    type: LOGIN,
    value: selectedUser
})

// though it's saving all users it is just only one JS object
export const saveUsersToStore = (users) => ({
    type: GET_USERS,
    value: users
})

// though it's saving all questions it is just only one JS object
export const saveQuestionsToStore = (questions) => ({
    type: GET_QUESTIONS,
    value: questions
})

// this action is for adding a user added question
export const addNewQuestionToStore = (question) => ({
    type: ADD_QUESTION,
    value: question
})

// this action is for adding a user added question
export const addNewQuestionIdToUser = (questionId, user) => ({
    type: ADD_QUESTION_TO_USER,
    value: { questionId, user }
})