import { combineReducers } from 'redux';
import database from './database';
import studentNames from './studentNames';
import chartData from './chartData';
import assignmentChartData from './assignmentChartData';

const rootReducer = combineReducers({
    database,
    studentNames,
    chartData,
    assignmentChartData
});

export default rootReducer;