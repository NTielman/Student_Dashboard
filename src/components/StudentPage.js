/* -------------- Sets studentpage data, sends data to charts and sidebar -------------- */
import React from 'react';
import Charts from './Charts';
import Sidebar from './Sidebar';
import SortMenu from "./SortMenu";
import { useSelector } from 'react-redux';

//receives a match object from router
const StudentPage = ({ match }) => {

    const getChartData = useSelector(state => state.chartData);
    const labels = getChartData.labels;
    const satisNums = getChartData.satisScore;
    const diffiNums = getChartData.diffiScore;

    const data = { labels, satisNums, diffiNums };

    //extra student info to be displayed in sidebar 
    const sidebarData = {
        avatarUrl: '',
        name: match.params.name,
        age: Math.floor(Math.random() * 73 + 8),
        tel: '012-345-6789',
        email: `${match.params.name}@gmail.com`,
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

export default StudentPage;