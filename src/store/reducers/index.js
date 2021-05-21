import { combineReducers } from 'redux';
import  toDoAddReducer from './reducer';

//Combines all the reducer for the store and exports to it
const rootReducer = combineReducers({
    toDoAddReducer
});
export default rootReducer;