import React from 'react';
import Charts from './Charts';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import getStudentRatings from '../functions/getStudentRatings';

const OpdrachtPage = () => {
    const studentNames = useSelector(state => state.studentNames);

    const opdrachtData = (opdr) => {
        const opdrSatCijfers = [];
        const opdrDifCijfers = [];

        const satArray = getStudentRatings(data, opdr, 'satisfaction');
        const diffArray = getStudentRatings(data, opdr, 'difficulty');

        for (let n = 0; n < satArray.length; n++) {

            const obj = { student: studentNames[n], satisNum: satArray[n] };
            opdrSatCijfers.push(obj);
        }

        for (let n = 0; n < diffArray.length; n++) {

            const obj = { student: studentNames[n], diffiNum: diffArray[n] };
            opdrDifCijfers.push(obj);
        }

    };

    return (
        <div>
            <Charts />
            <Sidebar />
        </div>
    );
}

export default OpdrachtPage;