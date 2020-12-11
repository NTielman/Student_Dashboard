import React from 'react';
import Charts from './Charts';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import getAverage from '../functions/getAverage';
import getStudentRatings from '../functions/getStudentRatings';

const HomePage = () => {
    const opdrachtenlijst = useSelector(state => state.assignments);
    const database = useSelector(state => state.studentData);

    //generates data to be sent to charts
    const getChartData = (metric) => {
        const numberArray = [];

        opdrachtenlijst.forEach(opdracht => {
            //get average per opdracht
            const average = getAverage(getStudentRatings(database, opdracht, metric))
            const opdrachtObj = { title: opdracht, score: average };
            numberArray.push(opdrachtObj);
        });
        return numberArray;
    };

    //calculates average satisfaction| difficulty score
    const getAverageScore = (metric) => {
        const numberArray = [];

        opdrachtenlijst.forEach(opdracht => {
            //get average per opdracht
            const average = getAverage(getStudentRatings(database, opdracht, metric))
            numberArray.push(average);
        });

        const avgScore = getAverage(numberArray);
        return avgScore;
    };

    //data and extra info to be displayed in sidebar
    const sidebarData = {
        avatarUrl: '',
        name: 'Winc Academy',
        tel: '063-904-1258',
        email: 'welkom@wincacademy.nl',
        data: {
            datasets: [{
                label: 'overall satisfaction score',
                data: [{
                    satisScore: getAverageScore('satisScore'),
                    diffiScore: getAverageScore('diffiScore')
                }],
                backgroundColor: ['rgba(255, 99, 132, 0.2)',
                    'rgba(270, 99, 132, 0.2)']
            }]
        }
    };

    const chartData = {
        labels: opdrachtenlijst,
        datasets: [{
            label: 'difficulty score',
            data: getChartData('diffiScore'),
            backgroundColor: 'rgba(255, 99, 132, 0.2)'
        },
        {
            label: 'satisfaction score',
            data: getChartData('satisScore'),
            backgroundColor: 'rgba(270, 99, 132, 0.2)'
        }]
    };

    return (
        <div>
            <Charts data={chartData} />
            <Sidebar data={sidebarData} />
        </div>
    );
}

export default HomePage;