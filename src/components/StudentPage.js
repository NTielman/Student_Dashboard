import React, { useState, useEffect } from 'react';
import Charts from './Charts';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import getAverage from '../functions/getAverage';

const StudentPage = ({ match }) => {

    const [labels, setLabels] = useState([]);
    const [satisNums, setSatisNums] = useState([]);
    const [diffiNums, setDiffiNums] = useState([]);

    const getChartData = useSelector(state => state.chartData);

    const setChartData = () => {
        setLabels(getChartData.labels);
        setSatisNums(getChartData.satisScore);
        setDiffiNums(getChartData.diffiScore);
    }

    useEffect(() => {
        setChartData();
    }, [getChartData]);

    const chartData = {
        labels,
        datasets: [{
            label: 'difficulty score',
            data: diffiNums,
            backgroundColor: 'blue'
        },
        {
            label: 'satisfaction score',
            data: satisNums,
            backgroundColor: 'orange'
        }]
    };

    //generates data to be sent to table
    const getTableData = () => {
        const rows = [];

        labels.forEach(opdracht => {
            //get average per opdracht
            const index = labels.indexOf(opdracht);
            let averageDiff = diffiNums[index];
            let averageSatis = satisNums[index];
            let overallScore = getAverage([averageDiff, averageSatis]);

            if (!overallScore) {
                overallScore = '-';
            }

            if (!averageDiff) {
                averageDiff = '-';
            }

            if (!averageSatis) {
                averageSatis = '-';
            }

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

    const tableData = getTableData();

    //data and extra info to be displayed in sidebar
    const sidebarData = {
        avatarUrl: '',
        name: match.params.name,
        age: Math.floor(Math.random() * 80),
        tel: '012-345-6789',
        email: `${match.params.name}@gmail.com`,
        data: {
            labels: ['satisfaction', 'difficulty'],
            datasets: [{
                label: 'overall satisfaction score',
                data: [
                    getAverage(satisNums),
                    getAverage(diffiNums)
                ],
                backgroundColor: ['green',
                    'orange']
            }]
        }
    };

    return (
        <div>
            <Charts data={chartData} table={tableData} />
            <Sidebar data={sidebarData} />
        </div>
    );
}

export default StudentPage;