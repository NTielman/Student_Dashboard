import React from 'react';
import Charts from './Charts';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import getAverage from '../functions/getAverage';
import getStudentRatings from '../functions/getStudentRatings';

const HomePage = () => {
    const opdrachtenlijst = useSelector(state => state.assignments);
    const database = useSelector(state => state.studentData);

    //generates array of data to be sent to charts
    const getChartData = (metric) => {
        const numberArray = [];

        opdrachtenlijst.forEach(opdracht => {
            //get average per opdracht
            const average = getAverage(getStudentRatings(database, opdracht, metric));
            numberArray.push(average);
        });
        return numberArray;
    };

    //generates data to be sent to charts
    const getTableData = () => {
        const rows = [];

        opdrachtenlijst.forEach(opdracht => {
            //get average per opdracht
            const averageDiff = getAverage(getStudentRatings(database, opdracht, 'diffiScore'));
            const averageSatis = getAverage(getStudentRatings(database, opdracht, 'satisScore'));
            const overallScore = Math.round(getAverage([averageDiff, averageSatis]));
            const columns = {
                title: opdracht,
                diffiNum: averageDiff,
                satisNum: averageSatis,
                overallScore
            };
            rows.push(columns);
        });
        return rows;
    };

    //data and extra info to be displayed in sidebar
    const sidebarData = {
        avatarUrl: '',
        name: 'Winc Academy',
        age: '',
        tel: '063-904-1258',
        email: 'welkom@wincacademy.nl',
        data: {
            labels: ['satisfaction', 'difficulty'],
            datasets: [{
                label: 'overall satisfaction score',
                data: [
                    getAverage(getChartData('satisScore')),
                    getAverage(getChartData('diffiScore'))
                ],
                backgroundColor: ['green',
                    'orange']
            }]
        }
    };

    const chartData = {
        labels: opdrachtenlijst,
        datasets: [{
            label: 'difficulty score',
            data: getChartData('diffiScore'),
            backgroundColor: 'blue'
        },
        {
            label: 'satisfaction score',
            data: getChartData('satisScore'),
            backgroundColor: 'orange'
        }]
    };

    const tableData = getTableData();

    return (
        <div>
            <Charts data={chartData} table={tableData} />
            <Sidebar data={sidebarData} />
        </div>
    );
}

export default HomePage;