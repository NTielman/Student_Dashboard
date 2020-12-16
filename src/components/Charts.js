import React from 'react';
import { Link } from 'react-router-dom';
import { Bar, Line, defaults } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import getStudentRatings from '../functions/getStudentRatings';
import { setOpChartData, resetData } from '../actions';

defaults.global.defaultFontFamily = "'Noto Sans', sans-serif";
defaults.global.defaultFontColor = 'rgb(243, 246, 250)';

const Charts = ({ barData, lineData, table }) => {


    const dispatch = useDispatch();
    const database = useSelector(state => state.studentData);
    //generates array of data to be sent to charts
    const getChartData = (opdracht) => {
        const metrics = ['satisScore', 'diffiScore']

        metrics.forEach(metric => {
            //get student ratings
            const ratings = getStudentRatings(database, opdracht, metric);
            dispatch(setOpChartData({ opdracht }));
            dispatch(setOpChartData({ [metric]: ratings }));
        });

    };

    return (
        <div className='charts-container'>
            <div className='bar-chart'>
                <div className="chart-tooltip bar-tooltip">
                    <div className='bottom-bar'></div>
                    <span className="tooltiptext">
                        click to filter out a metric
                    </span>
                </div>
                <Bar
                    options={{
                        responsive: true,
                        legend: {
                            align: "end",
                            labels: {
                                boxWidth: 15,
                            }
                        },
                        tooltips: {
                            backgroundColor: 'rgb(42, 24, 108)',
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    maxTicksLimit: 6,
                                    beginAtZero: true
                                }
                            }]
                        }
                    }}
                    data={barData}
                    width={400}
                    height={200} />
            </div>

            <div className='bottom-charts'>
                <div className='line-chart'>
                    <div className="chart-tooltip line-tooltip">
                        <span className="tooltiptext">
                            click to filter out a metric
                    </span>
                    </div>
                    <Line
                        options={{
                            responsive: true,
                            legend: {
                                align: "end",
                                labels: {
                                    boxWidth: 15,
                                }
                            },
                            tooltips: {
                                backgroundColor: 'rgb(42, 24, 108)',
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        maxTicksLimit: 6,
                                        beginAtZero: true
                                    }
                                }],
                                xAxes: [{
                                    ticks: {
                                        autoSkip: true,
                                    }
                                }]
                            }
                        }}
                        data={lineData}
                        width={400}
                        height={250} />
                </div>

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
                                                getChartData(row.title)
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