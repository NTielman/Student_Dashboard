import React from 'react';
import Bar from './Bar';
import Line from './Line';
import Table from './Table';

const Charts = ({ data }) => {

    return (
        <div className='charts-container'>
            <Bar labels={data.labels} diffiNums={data.diffiNums} satisNums={data.satisNums} />
            <div className='bottom-charts'>
                <Line labels={data.labels} diffiNums={data.diffiNums} satisNums={data.satisNums} />
                <Table labels={data.labels} diffiNums={data.diffiNums} satisNums={data.satisNums} />
            </div>
        </div>
    );
}

export default Charts;