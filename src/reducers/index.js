import { combineReducers } from 'redux';
import studentData from './studentData';
import studentNames from './studentNames';
import assignments from './assignments';

const rootReducer = combineReducers({
    studentData,
    studentNames,
    assignments

});

export default rootReducer;