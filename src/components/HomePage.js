import React, { useState, useEffect } from 'react';
import Charts from './Charts';
import Sidebar from './Sidebar';
import SortMenu from "./SortMenu";
import { useSelector } from 'react-redux';
import getAverage from '../functions/getAverage';

const HomePage = () => {

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


    const barChartData = (canvas) => {
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

    const lineChartData = (canvas) => {
        const ctx = canvas.getContext('2d');
        let diffiGradient = ctx.createLinearGradient(0, 90, 0, 400);
        diffiGradient.addColorStop(0, 'rgba(0, 204, 188, 1)');
        diffiGradient.addColorStop(.5, 'rgba(97, 24, 152, 0.2)');
        diffiGradient.addColorStop(1, 'rgba(97, 24, 152, 0)');

        let satisGradient = ctx.createLinearGradient(0, 90, 0, 400);
        satisGradient.addColorStop(0, 'rgba(244, 81, 126, 1)');
        satisGradient.addColorStop(.3, 'rgba(97, 24, 152, 0.5)');
        satisGradient.addColorStop(1, ' rgba(26, 15, 67, 0)');

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

    //data and extra info to be displayed in sidebar
    const sidebarData = {
        avatarUrl: '',
        name: 'Winc Academy',
        age: '',
        tel: '063-904-1258',
        email: 'welkom@wincacademy.nl',
    };

    return (
        <div className='page-container'>
            <div className='middle-box'>
                <SortMenu />
                <Charts barData={barChartData} lineData={lineChartData} table={tableData} />
            </div>
            <Sidebar data={sidebarData} chart={sidebarChart} />
        </div>
    );
}

export default HomePage;