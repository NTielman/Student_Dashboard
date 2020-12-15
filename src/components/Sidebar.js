import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const Sidebar = ({ data, chart }) => {

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