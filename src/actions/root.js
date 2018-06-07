// ACTION TYPES
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const GET_USERS = "GET_USERS";
export const GET_QUESTIONS = "GET_QUESTIONS";


// ACTION CREATORS

export const logout = () => ({
    type: LOGOUT,
    value: false
})

export const login = (selectedUser) => ({
    type: LOGIN,
    value: selectedUser
})

export const saveUsersToStore = (users) => ({
    type: GET_USERS,
    value: users
})

export const saveQuestionsToStore = (questions) => ({
    type: GET_QUESTIONS,
    value: questions
})