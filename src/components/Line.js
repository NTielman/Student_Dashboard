/* -------------- Renders a line chart -------------- */
import React from 'react';
import { Line, defaults } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';

//sets default font family and font color of chart
defaults.global.defaultFontFamily = "'Noto Sans', sans-serif";
defaults.global.defaultFontColor = 'rgb(243, 246, 250)';

const LineChart = ({ labels, diffiNums, satisNums }) => {

    //checks if currentpage = homePage, studentPage or Opdrachtpage
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
        } else { //if currentpage = homepage or studentpage use below gradients
            diffiGradient = ctx.createLinearGradient(0, 90, 0, 400);
            satisGradient = ctx.createLinearGradient(0, 90, 0, 400);
        }

        //add color stops to gradients
        diffiGradient.addColorStop(0, 'rgba(0, 204, 188, 1)'); //top: opaque Lightblue
        diffiGradient.addColorStop(.5, 'rgba(97, 24, 152, 0.2)'); //mid: semiTransparent Purple
        diffiGradient.addColorStop(1, 'rgba(97, 24, 152, 0)'); //bottom: transparent Purple

        satisGradient.addColorStop(0, 'rgba(244, 81, 126, 1)'); //top: opaque Pink
        satisGradient.addColorStop(.3, 'rgba(97, 24, 152, 0.5)'); //mid: semiTransparent Purple
        satisGradient.addColorStop(1, ' rgba(26, 15, 67, 0)'); //bottom: transparent DarkBlue

        //return data to be charted
        return {
            labels, //x-axis labels: opdrachtenlijst or studentlist
            datasets: [{
                label: 'difficulty score',
                data: diffiNums, //array of dificultyScores 
                backgroundColor: diffiGradient //opaque blue to transparent purple background color
            },
            {
                label: 'satisfaction score',
                data: satisNums, //array of satisfactionScores 
                backgroundColor: satisGradient //opaque pink to transparent darkblue
            }]
        }
    };

    return (
        <div className='line-chart'>

            <span className="tooltiptext">
                click to filter out a metric
            </span>

            <Line
                options={{
                    responsive: true, //chart size responsive to window resizing etc.
                    legend: {
                        align: "end", //aligns Legenda right 
                        labels: {
                            boxWidth: 15, //sets width of Legenda colorbox
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
                        }],
                        xAxes: [{
                            ticks: {
                                autoSkip: true, //x-axis auto calculates how many labels to display based on window resize
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