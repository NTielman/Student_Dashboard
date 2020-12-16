import React from 'react';
import { Link } from 'react-router-dom';
import Bar from './Bar';
import Line from './Line';
import Table from './Table';
// import { Bar, Line, defaults } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import getStudentRatings from '../functions/getStudentRatings';
import { setOpChartData, resetData } from '../actions';

// defaults.global.defaultFontFamily = "'Noto Sans', sans-serif";
// defaults.global.defaultFontColor = 'rgb(243, 246, 250)';

const Charts = ({ barData, lineData, table }) => {


    const dispatch = useDispatch();
    const database = useSelector(state => state.studentData);
    //generates array of data to be sent to charts
    const handleOpdrClick = (opdracht) => {
        const dataObj = { opdracht };
        const metrics = ['satisScore', 'diffiScore']

        metrics.forEach(metric => {
            //get student ratings
            const ratings = getStudentRatings(database, opdracht, metric);
            dataObj[metric] = ratings;
        });
        dispatch(setOpChartData(dataObj));
    };

    return (
        <div className='charts-container'>
            <Bar barData={barData} />

            <div className='bottom-charts'>
                <Line lineData={lineData} />

                <div className='table-container'>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>difficulty score:</th>
                                <th>satisfaction score:</th>
                                <th>overall score:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {table.map(row => {
                                if (row.title !== undefined) {
                                    return (
                                        <tr key={row.title}>
                                            <th onClick={() => {
                                                dispatch(resetData())
                                                handleOpdrClick(row.title)
                                            }}>
                                                <Link to={`/OpdrachtPage/${row.title}`}>
                                                    {row.title}
                                                </Link>
                                            </th>
                                            <td>{row.diffiNum}</td>
                                            <td>{row.satisNum}</td>
                                            <td>{row.overallScore}</td>
                                        </tr>
                                    )
                                } else {
                                    return (
                                        <tr key={row.id}>
                                            <th>{row.name}</th>
                                            <td>{row.diffiNum}</td>
                                            <td>{row.satisNum}</td>
                                            <td>{row.overallScore}</td>
                                        </tr>
                                    )
                                }

                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Charts;