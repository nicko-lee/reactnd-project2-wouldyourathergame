// ACTION TYPES
export const MOCK_TYPE = "MOCK_TYPE";
export const ANOTHER_TYPE = "ANOTHER_TYPE";


// ACTION CREATORS
export const mockAction = (value) => ({
    type: MOCK_TYPE,
    value: value
});

export const anotherAction = () => ({
    type: ANOTHER_TYPE,
    value: 20
})