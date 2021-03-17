/* -------------- Displays sidebar and doughnut chart -------------- */
import React from 'react';
import { Doughnut, defaults } from 'react-chartjs-2';
import getAverage from '../functions/getAverage';

//sets default font family and font color of chart
defaults.global.defaultFontFamily = "'Noto Sans', sans-serif";
defaults.global.defaultFontColor = 'rgb(243, 246, 250)';

const Sidebar = ({ data, diffiNums, satisNums }) => {

    const doughnutData = (canvas) => {

        const ctx = canvas.getContext('2d');

        //create linear gradients
        const diffiGradient = ctx.createLinearGradient(20, 0, 180, 0);
        diffiGradient.addColorStop(1, 'rgb(0, 204, 188)'); //right: Lightblue
        diffiGradient.addColorStop(0, 'rgb(97, 24, 152)'); //left: Purple

        const satisGradient = ctx.createLinearGradient(180, 0, 20, 0);
        satisGradient.addColorStop(1, 'rgb(244, 81, 126)'); //left: Pink
        satisGradient.addColorStop(.3, 'rgb(97, 24, 152)'); //mid: Purple
        satisGradient.addColorStop(0, ' rgb(26, 15, 67)'); //right: DarkBlue

        return {
            labels: ['satisfaction', 'difficulty'],
            datasets: [{
                label: 'overall satisfaction score',
                data: [
                    getAverage(satisNums), //overall average satisfactionScore
                    getAverage(diffiNums) //overall average difficultyScore
                ],
                borderColor: 'rgb(26, 15, 67)',
                backgroundColor: [satisGradient, //pink to darkblue
                    diffiGradient] //purple to blue
            }]
        }
    };

    return (
        <div className='sidebar'>

            <div className="avatar-container">
                {data.avatarUrl === '' ? null : <img src={data.avatarUrl} alt='avatar'></img>}
            </div>

            <div className='student-info'>
                <h2>{data.name}</h2>
                {data.age !== '' ? <p>{data.age}</p> : null}
                <p>{data.tel}</p>
                <p>{data.email}</p>
            </div>

            <div className='sidebar-chart'>
                <Doughnut
                    width={200}
                    height={150}
                    options={{
                        responsive: true, //chart size responsive to window resizing etc.
                        title: {
                            display: true,
                            lineHeight: 2.5,
                            text: 'Overall Satisfaction Meter:'
                        },
                        tooltips: {
                            backgroundColor: 'rgb(42, 24, 108)', //sets tooltip backgroundColor to Purple
                        },
                        rotation: 1 * Math.PI, //rotates donut chart to horizontal position
                        circumference: 1 * Math.PI, //displays half doughnut chart
                        legend: {
                            display: false
                        },
                    }}
                    data={doughnutData} />

                <div className='custom-labels'>
                    <label>
                        <i className="fas fa-heart"></i>
                    </label>
                    <label>
                        <i className="far fa-heart"></i>
                    </label>
                </div>

            </div>

        </div>
    );
}

export default Sidebar;