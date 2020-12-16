import React from 'react';
import { Line, defaults } from 'react-chartjs-2';

//sets default font family and color of chart
defaults.global.defaultFontFamily = "'Noto Sans', sans-serif";
defaults.global.defaultFontColor = 'rgb(243, 246, 250)';

const LineChart = ({ lineData }) => {

    return (
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
    );
}

export default LineChart;