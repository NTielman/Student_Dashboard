import React from 'react';
import { Bar, defaults } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';

//sets default font family and color of chart
defaults.global.defaultFontFamily = "'Noto Sans', sans-serif";
defaults.global.defaultFontColor = 'rgb(243, 246, 250)';

const BarChart = ({ labels, diffiNums, satisNums }) => {

    //checks if currentpage = home studentPage or Opdrachtpage
    const location = useLocation();
    let currentPage = location.pathname.split('/')[1];

    const barData = (canvas) => {
        const ctx = canvas.getContext('2d');
        //declare gradient variables
        let diffiGradient;
        let satisGradient;

        //create and initialise linear gradients
        if (currentPage === 'OpdrachtPage') {
            diffiGradient = ctx.createLinearGradient(0, 300, 0, 500);
            satisGradient = ctx.createLinearGradient(0, 300, 0, 500);
        } else {
            diffiGradient = ctx.createLinearGradient(0, 200, 0, 350);
            satisGradient = ctx.createLinearGradient(0, 200, 0, 350);
        }

        //add colors to gradients
        diffiGradient.addColorStop(0, 'rgb(0, 204, 188)');
        diffiGradient.addColorStop(1, 'rgb(97, 24, 152)');

        satisGradient.addColorStop(0, 'rgb(244, 81, 126)');
        satisGradient.addColorStop(.6, 'rgb(97, 24, 152)');
        satisGradient.addColorStop(1, ' rgb(26, 15, 67)');

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