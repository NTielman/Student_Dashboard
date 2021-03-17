/* -------------- Sets assignmentpage data, sends data to charts and sidebar -------------- */
import React from 'react';
import Charts from './Charts';
import Sidebar from './Sidebar';
import SortMenu from "./SortMenu";
import { useSelector } from 'react-redux';

//receives a match object from router
const AssignmentPage = ({ match }) => {

    const getAssignmentData = useSelector(state => state.assignmentChartData);
    const labels = getAssignmentData.labels;
    const satisNums = getAssignmentData.satisScore;
    const diffiNums = getAssignmentData.diffiScore;

    const data = { labels, satisNums, diffiNums };
    const sidebarData = {
        avatarUrl: '',
        name: match.params.title,
        age: '',
        tel: '',
        email: '',
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

export default AssignmentPage;