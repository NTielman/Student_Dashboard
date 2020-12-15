import React, { useState, useEffect } from 'react';
import Charts from './Charts';
import Sidebar from './Sidebar';
import SortMenu from "./SortMenu";
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

    const chartData = (canvas) => {
        const ctx = canvas.getContext('2d');
        let diffiGradient = ctx.createLinearGradient(0, 200, 0, 350);
        diffiGradient.addColorStop(0, 'rgb(0, 204, 188)');
        diffiGradient.addColorStop(1, 'rgb(97, 24, 152)');

        let satisGradient = ctx.createLinearGradient(0, 200, 0, 350);
        satisGradient.addColorStop(0, 'rgb(244, 81, 126)');
        satisGradient.addColorStop(.6, 'rgb(97, 24, 152)');
        satisGradient.addColorStop(1, ' rgb(26, 15, 67)');

        return {
            labels,
            datasets: [{
                label: 'difficulty score',
                data: diffiNums,
                backgroundColor: diffiGradient
            },
            {
                label: 'satisfaction score',
                data: satisNums,
                backgroundColor: satisGradient
            }]
        }
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
    };

    const sidebarChart = (canvas) => {
        const ctx = canvas.getContext('2d');
        let diffiGradient = ctx.createLinearGradient(20, 0, 180, 0);
        diffiGradient.addColorStop(1, 'rgb(0, 204, 188)');
        diffiGradient.addColorStop(0, 'rgb(97, 24, 152)');

        let satisGradient = ctx.createLinearGradient(180, 0, 20, 0);
        satisGradient.addColorStop(1, 'rgb(244, 81, 126)');
        satisGradient.addColorStop(.3, 'rgb(97, 24, 152)');
        satisGradient.addColorStop(0, ' rgb(26, 15, 67)');

        return {
            labels: ['satisfaction', 'difficulty'],
            datasets: [{
                label: 'overall satisfaction score',
                data: [
                    getAverage(satisNums),
                    getAverage(diffiNums)
                ],
                borderColor: 'rgb(26, 15, 67)',
                backgroundColor: [satisGradient,
                    diffiGradient]
            }]
        }
    }

    return (
        <div className='page-container'>
            <div className='middle-box'>
                <SortMenu />
                <Charts data={chartData} table={tableData} />
            </div>
            <Sidebar data={sidebarData} chart={sidebarChart} />
        </div>
    );
}

export default OpdrachtPage;