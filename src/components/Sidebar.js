import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const Sidebar = ({ data }) => {

    return (
        <div className='sidebar'>
            <div className="avatar-container">
                {data.avatarUrl === '' ? null : <img src={data.avatarUrl} alt='avatar'></img>}
            </div>
            <h2>{data.name}</h2>
            {data.age !== '' ? <p>{data.age}</p> : null}
            <p>{data.tel}</p>
            <p>{data.email}</p>
            <Doughnut
                width={200}
                height={100}
                options={{
                    rotation: 1 * Math.PI,
                    circumference: 1 * Math.PI,
                    legend: {
                        display: false
                    },
                }}
                data={data.data} />
            <div className='satisfaction-labels'>
                <label>
                    <i className="fas fa-heart"></i>
                </label>
                <label>
                    <i className="far fa-heart"></i>
                </label>
            </div>

        </div>
    );
}

export default Sidebar;