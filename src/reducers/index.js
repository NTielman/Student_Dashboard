import { combineReducers } from 'redux';
import studentData from './studentData';
import studentNames from './studentNames';
import chartData from './chartData';
import opdrachtChartData from './opdrachtChartData';

const rootReducer = combineReducers({
    studentData,
    studentNames,
    chartData,
    opdrachtChartData

});

export default rootReducer;