import React from 'react';
import Charts from './Charts';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import getAverage from '../functions/getAverage';
import getStudentRatings from '../functions/getStudentRatings';

const OpdrachtPage = ({ match }) => {

    const database = useSelector(state => state.studentData);
    const studentNames = useSelector(state => state.studentNames);

    //generates array of data to be sent to charts
    const getChartData = (opdracht, metric) => {

        //get student ratings
        const ratings = getStudentRatings(database, opdracht, metric);

        return ratings;
    };

    //generates data to be sent to table
    const getTableData = () => {
        const rows = [];

        const diffScore = getStudentRatings(database, match.params.title, 'diffiScore');
        const satisScore = getStudentRatings(database, match.params.title, 'satisScore');

        studentNames.forEach(student => {
            //check if student is active
            const foundStudent = database.find(prsn => prsn.name === student);
            const n = database.indexOf(foundStudent);

            // console.log(foundStudent);
            if (foundStudent.isActive) {
                const overallScore = getAverage([diffScore[n], satisScore[n]]);
                const columns = {
                    name: foundStudent.name,
                    diffiNum: diffScore[n],
                    satisNum: satisScore[n],
                    overallScore,
                    id: n
                };
                rows.push(columns);
            } else {
                const columns = {
                    name: foundStudent.name,
                    diffiNum: '-',
                    satisNum: '-',
                    overallScore: '-',
                    id: n
                };
                rows.push(columns);
            }

        });

        return rows;
    };

    //data and extra info to be displayed in sidebar
    const sidebarData = {
        avatarUrl: '',
        name: match.params.title,
        age: '',
        tel: '063-904-1258',
        email: 'welkom@wincacademy.nl',
        data: {
            labels: ['satisfaction', 'difficulty'],
            datasets: [{
                label: 'overall satisfaction score',
                data: [
                    getAverage(getChartData(match.params.title, 'satisScore')),
                    getAverage(getChartData(match.params.title, 'diffiScore'))
                ],
                backgroundColor: ['green',
                    'orange']
            }]
        }
    };

    const chartData = {
        labels: studentNames,
        datasets: [{
            label: 'difficulty score',
            data: getChartData(match.params.title, 'diffiScore'),
            backgroundColor: 'blue'
        },
        {
            label: 'satisfaction score',
            data: getChartData(match.params.title, 'satisScore'),
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

export default OpdrachtPage;