/* -------------- Sets opdrachtpage data, sends data to charts and sidebar -------------- */
import React from 'react';
import Charts from './Charts';
import Sidebar from './Sidebar';
import SortMenu from "./SortMenu";
import { useSelector } from 'react-redux';

//receives a match object from router
const OpdrachtPage = ({ match }) => {

    //get labels and chartData from Store
    const getOpdrachtData = useSelector(state => state.opdrachtChartData);
    const labels = getOpdrachtData.labels;
    const satisNums = getOpdrachtData.satisScore;
    const diffiNums = getOpdrachtData.diffiScore;

    //create a data object to send to Charts, table and sidebar 
    const data = { labels, satisNums, diffiNums };

    //extra opdrachtPage info to be displayed in sidebar 
    const sidebarData = {
        avatarUrl: '',
        name: match.params.title,
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

export default OpdrachtPage;