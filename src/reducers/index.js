import { combineReducers } from 'redux';
import database from './database';
import studentNames from './studentNames';
import chartData from './chartData';
import opdrachtChartData from './opdrachtChartData';

const rootReducer = combineReducers({
    database,
    studentNames,
    chartData,
    opdrachtChartData
});

export default rootReducer;