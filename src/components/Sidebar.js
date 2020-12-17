import React from 'react';
import { Doughnut, defaults } from 'react-chartjs-2';
import getAverage from '../functions/getAverage';

//sets default font family and color of chart
defaults.global.defaultFontFamily = "'Noto Sans', sans-serif";
defaults.global.defaultFontColor = 'rgb(243, 246, 250)';

const Sidebar = ({ data, diffiNums, satisNums }) => {

    const chart = (canvas) => {
        const ctx = canvas.getContext('2d');
        let diffiGradient = ctx.createLinearGradient(20, 0, 180, 0);
        diffiGradient.addColorStop(1, 'rgb(0, 204, 188)');
        diffiGradient.addColorStop(0, 'rgb(97, 24, 152)');

        let satisGradient = ctx.createLinearGradient(180, 0, 20, 0);
        satisGradient.addColorStop(1, 'rgb(244, 81, 126)');
        satisGradient.addColorStop(.3, 'rgb(97, 24, 152)');
        satisGradient.addColorStop(0, ' rgb(26, 15, 67)');

        return {
            labels: ['satisfaction', 'difficulty'],
            datasets: [{
                label: 'overall satisfaction score',
                data: [
                    getAverage(satisNums),
                    getAverage(diffiNums)
                ],
                borderColor: 'rgb(26, 15, 67)',
                backgroundColor: [satisGradient,
                    diffiGradient]
            }]
        }
    }

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
                        responsive: true,
                        title: {
                            display: true,
                            lineHeight: 2.5,
                            text: 'Overall Satisfaction Meter:'
                        },
                        tooltips: {
                            backgroundColor: 'rgb(42, 24, 108)',
                        },
                        rotation: 1 * Math.PI,
                        circumference: 1 * Math.PI,
                        legend: {
                            display: false
                        },
                    }}
                    data={chart} />
                <div className='satisfaction-labels'>
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