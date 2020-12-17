/* -------------- Sets homepage data, sends data to charts and sidebar -------------- */
import React, { useState, useEffect } from 'react';
import Charts from './Charts';
import Sidebar from './Sidebar';
import SortMenu from "./SortMenu";
import { useSelector } from 'react-redux';

const HomePage = () => {

    //initialise labels and chartData as empty arrays
    const [labels, setLabels] = useState([]);
    const [satisNums, setSatisNums] = useState([]);
    const [diffiNums, setDiffiNums] = useState([]);

    //get labels and chartData from Store
    const getChartData = useSelector(state => state.chartData);

    //updates useState with data from Store
    const setChartData = () => {
        setLabels(getChartData.labels);
        setSatisNums(getChartData.satisScore);
        setDiffiNums(getChartData.diffiScore);
    }

    //when data has been fetched and sent to Store, update usestate
    useEffect(() => {
        setChartData();
    }, [getChartData]);

    //create a data object to send to Charts, table and sidebar 
    const data = { labels, satisNums, diffiNums };

    //extra HomePage info to be displayed in sidebar 
    const sidebarData = {
        avatarUrl: '',
        name: 'Winc Academy',
        age: '',
        tel: '063-904-1258',
        email: 'welkom@wincacademy.nl',
    };

    //send page Data to Charts and Sidebar 
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