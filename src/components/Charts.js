import React from 'react';
import { Link } from 'react-router-dom';
import { Bar, Line } from 'react-chartjs-2';

const Charts = ({ data, table }) => {

    return (
        <div className='charts-container'>
            <div className='bar-chart'>
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
                                        <th>
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