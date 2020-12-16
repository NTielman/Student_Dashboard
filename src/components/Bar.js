import React from 'react';
import { Bar, defaults } from 'react-chartjs-2';

//sets default font family and color of chart
defaults.global.defaultFontFamily = "'Noto Sans', sans-serif";
defaults.global.defaultFontColor = 'rgb(243, 246, 250)';

const BarChart = ({ barData }) => {

    return (
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
    );
}

export default BarChart;