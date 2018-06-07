// ACTION TYPES
export const MOCK_TYPE = "MOCK_TYPE";
export const ANOTHER_TYPE = "ANOTHER_TYPE";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

// ACTION CREATORS
export const mockAction = (value) => ({
    type: MOCK_TYPE,
    value: value
});

export const anotherAction = () => ({
    type: ANOTHER_TYPE,
    value: 20
})

export const logout = () => ({
    type: LOGOUT,
    value: false
})

export const login = (selectedUser) => ({
    type: LOGIN,
    value: selectedUser
})