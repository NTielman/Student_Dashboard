import React from 'react';
import { Link } from 'react-router-dom';
import { Bar, Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import getStudentRatings from '../functions/getStudentRatings';
import { setOpChartData, resetData } from '../actions';

const Charts = ({ data, table }) => {

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
                <span className="chart-tooltip bar-tooltip">
                    <span className="tooltiptext">
                        click to filter out a metric
                    </span>
                </span>
                <Bar
                    options={{
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }}
                    data={data}
                    width={400}
                    height={200} />
            </div>

            <div className='line-chart'>
                <span className="chart-tooltip line-tooltip">
                    <span className="tooltiptext">
                        click to filter out a metric
                    </span>
                </span>
                <Line
                    options={{
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }}
                    data={data}
                    width={250}
                    height={100} />
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
    );
}

export default Charts;