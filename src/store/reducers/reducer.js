import * as actionTypes from '../action';
const initialState = {
    data: [],
    isSuccess: false
}

const toDoAdd = (state = initialState, action) => {
    const { type, payloads } = action;
    switch (type) {
        case actionTypes.TODO_ADD_SUCCESS:
            return {
                ...state, data: [...state.data, payloads], isSuccess: true
            };
        case actionTypes.TODO_ADD_ERROR:
            return {
                ...state, data: payloads, isSuccess: false
            };
        default:
            return state;
    }
}

export default toDoAdd;