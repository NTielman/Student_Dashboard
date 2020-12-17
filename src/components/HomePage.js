import React, { useState, useEffect } from 'react';
import Charts from './Charts';
import Sidebar from './Sidebar';
import SortMenu from "./SortMenu";
import { useSelector } from 'react-redux';

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

    const data = { labels, satisNums, diffiNums };

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
                <Charts data={data} />
            </div>
            <Sidebar data={sidebarData} diffiNums={diffiNums} satisNums={satisNums} />
        </div>
    );
}

export default HomePage;