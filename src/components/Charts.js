import React from 'react';
import { useSelector } from 'react-redux';
import getAverage from '../functions/getAverage';
import getStudentRatings from '../functions/getStudentRatings';

const Charts = () => {
    const data = useSelector(state => state.studentData);
    const studentNames = useSelector(state => state.studentNames);
    const opdrachten = useSelector(state => state.assignments);

    const chartData = () => {
        const diffiNums = [];
        const satisNums = [];

        opdrachten.forEach(opdr => {
            //get gemmiddelde per opdracht
            const gem = getAverage(getStudentRatings(data, opdr, 'difficulty'))
            const opdrDataObj = { title: opdr, diffiNum: gem };
            diffiNums.push(opdrDataObj);
        });

        opdrachten.forEach(opdr => {
            //get gemmiddelde per opdracht
            const gem = getAverage(getStudentRatings(data, opdr, 'satisfaction'))
            const opdrDataObj = { title: opdr, satisNum: gem };
            satisNums.push(opdrDataObj);
        });

    };

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

    // opdrachtData('SCRUM');
    return (
        <div>
            charts
        </div>
    );
}

export default Charts;