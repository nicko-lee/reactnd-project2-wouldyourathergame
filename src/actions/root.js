// ACTION TYPES
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const GET_USERS = "GET_USERS";
export const GET_QUESTIONS = "GET_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_QUESTION_TO_USER = "ADD_QUESTION_TO_USER";
export const ADD_ANSWER_TO_USER = "ADD_ANSWER_TO_USER";
export const ADD_ANSWER_TO_QUESTION = "ADD_ANSWER_TO_QUESTION";
export const SET_REDIRECT_URL = "SET_REDIRECT_URL";
export const CLEAR_REDIRECT_URL = "CLEAR_REDIRECT_URL";



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

// this action is for adding a user added answer to an already existing question
export const addNewUserAnswerToStore = (answer) => ({
    type: ADD_ANSWER_TO_USER,
    value: answer
})

// this action is for adding a user added answer to an already existing question
export const updateQuestionToBeAwareOfUserAnswer = (answer) => ({
    type: ADD_ANSWER_TO_QUESTION,
    value: answer
})

// this action is for saving the url the user typed in at the start so u can redirect the user after he logs in
export const setRedirectUrl = (url) => ({
    type: SET_REDIRECT_URL,
    value: url
})

// this action is for clearing the url after the user has signed in so that the next user will start at the home page "/"
export const clearRedirectUrl = () => ({
    type: CLEAR_REDIRECT_URL,
    value: ""
})