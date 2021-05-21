import * as actionTypes from '../action.js';

export const toDoAddAction = (data)=>{
    return((dispatch)=>{
        dispatch({
            type: actionTypes.TODO_ADD_SUCCESS,
            payloads: data
        })
    })
} 