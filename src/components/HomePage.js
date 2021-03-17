/* -------------- Sets homepage data, sends data to charts and sidebar -------------- */
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

    //after data has been fetched
    useEffect(() => {
        setChartData();
    }, [getChartData]);


    const data = { labels, satisNums, diffiNums };
    const sidebarData = {
        avatarUrl: '',
        name: 'Academy name',
        age: '',
        tel: '054-902-2278',
        email: 'welcome@academy.nl',
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