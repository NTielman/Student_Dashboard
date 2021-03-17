/* -------------- Renders a bar chart -------------- */
import React from 'react';
import { Bar, defaults } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';

//sets default font family and font color of chart
defaults.global.defaultFontFamily = "'Noto Sans', sans-serif";
defaults.global.defaultFontColor = 'rgb(243, 246, 250)';

const BarChart = ({ labels, diffiNums, satisNums }) => {

    const location = useLocation();
    let currentPage = location.pathname.split('/')[1];

    const barData = (canvas) => {

        const ctx = canvas.getContext('2d');
        let diffiGradient;
        let satisGradient;

        //create linear gradients
        if (currentPage === 'AssignmentPage') {
            diffiGradient = ctx.createLinearGradient(0, 300, 0, 500);
            satisGradient = ctx.createLinearGradient(0, 300, 0, 500);
        } else {
            diffiGradient = ctx.createLinearGradient(0, 200, 0, 350);
            satisGradient = ctx.createLinearGradient(0, 200, 0, 350);
        }

        //add color stops to gradients
        diffiGradient.addColorStop(0, 'rgb(0, 204, 188)'); //top: Lightblue
        diffiGradient.addColorStop(1, 'rgb(97, 24, 152)'); //bottom: Purple

        satisGradient.addColorStop(0, 'rgb(244, 81, 126)'); //top: Pink
        satisGradient.addColorStop(.6, 'rgb(97, 24, 152)'); //mid: Purple
        satisGradient.addColorStop(1, 'rgb(26, 15, 67)'); //bottom: DarkBlue

        return {
            labels, //x-axis labels: assignmentlist or studentlist
            datasets: [{
                label: 'difficulty score',
                data: diffiNums, //array of dificultyScores 
                backgroundColor: diffiGradient //blue to purple background color
            },
            {
                label: 'satisfaction score',
                data: satisNums, //array of satisfactionScores 
                backgroundColor: satisGradient //pink to darkblue
            }]
        }
    };

    return (
        <div className='bar-chart'>

            <span className="tooltiptext">
                Click on a legend box or label to toggle a chart metric on/off
            </span>

            <Bar
                options={{
                    responsive: true, //chart size responsive to window resizing.
                    legend: {
                        align: "end", //aligns Legend right 
                        labels: {
                            boxWidth: 15, //sets width of Legend colorbox
                        }
                    },
                    tooltips: {
                        backgroundColor: 'rgb(42, 24, 108)', //sets tooltip backgroundColor to Purple
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                maxTicksLimit: 6, //y-axis only goes up to 5 
                                beginAtZero: true //begin y-axis at 0
                            }
                        }]
                    }
                }}
                data={barData}
                width={380}
                height={150} />
        </div>
    );
}

export default BarChart;