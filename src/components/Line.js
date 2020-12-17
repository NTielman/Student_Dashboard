import React from 'react';
import { Line, defaults } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';

//sets default font family and color of chart
defaults.global.defaultFontFamily = "'Noto Sans', sans-serif";
defaults.global.defaultFontColor = 'rgb(243, 246, 250)';

const LineChart = ({ labels, diffiNums, satisNums }) => {

    //checks if currentpage = home studentPage or Opdrachtpage
    const location = useLocation();
    let currentPage = location.pathname.split('/')[1];

    const lineData = (canvas) => {
        const ctx = canvas.getContext('2d');
        //declare gradient variables
        let diffiGradient;
        let satisGradient;

        //create and initialise linear gradients
        if (currentPage === 'OpdrachtPage') {
            diffiGradient = ctx.createLinearGradient(0, 190, 0, 500);
            satisGradient = ctx.createLinearGradient(0, 200, 0, 400);
        } else {
            diffiGradient = ctx.createLinearGradient(0, 90, 0, 400);
            satisGradient = ctx.createLinearGradient(0, 90, 0, 400);
        }

        //add colors to gradients
        diffiGradient.addColorStop(0, 'rgba(0, 204, 188, 1)');
        diffiGradient.addColorStop(.5, 'rgba(97, 24, 152, 0.2)');
        diffiGradient.addColorStop(1, 'rgba(97, 24, 152, 0)');

        satisGradient.addColorStop(0, 'rgba(244, 81, 126, 1)');
        satisGradient.addColorStop(.3, 'rgba(97, 24, 152, 0.5)');
        satisGradient.addColorStop(1, ' rgba(26, 15, 67, 0)');

        return {
            labels,
            datasets: [{
                label: 'difficulty score',
                data: diffiNums,
                backgroundColor: diffiGradient
            },
            {
                label: 'satisfaction score',
                data: satisNums,
                backgroundColor: satisGradient
            }]
        }
    };

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