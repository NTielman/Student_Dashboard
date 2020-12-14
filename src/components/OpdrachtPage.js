import React, { useState, useEffect } from 'react';
import Charts from './Charts';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import getAverage from '../functions/getAverage';

const OpdrachtPage = ({ match }) => {

    const [labels, setLabels] = useState([]);
    const [satisNums, setSatisNums] = useState([]);
    const [diffiNums, setDiffiNums] = useState([]);

    const database = useSelector(state => state.studentData);
    const getOpChartData = useSelector(state => state.opdrachtChartData);

    const setChartData = () => {
        setLabels(getOpChartData.labels);
        setSatisNums(getOpChartData.satisScore);
        setDiffiNums(getOpChartData.diffiScore);
    }

    useEffect(() => {
        setChartData();
    }, [getOpChartData]);

    const chartData = {
        labels: labels,
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

        labels.forEach(student => {
            //check if student is active
            const foundStudent = database.find(prsn => prsn.name === student);
            const n = labels.indexOf(student);

            if (foundStudent.isActive) {
                const overallScore = getAverage([diffiNums[n], satisNums[n]]);
                const columns = {
                    name: student,
                    diffiNum: diffiNums[n],
                    satisNum: satisNums[n],
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

    const tableData = getTableData();

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

export default OpdrachtPage;