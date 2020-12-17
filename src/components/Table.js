import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import getStudentRatings from '../functions/getStudentRatings';
import { setOpdrChartData, resetData } from '../actions';
import { useLocation } from 'react-router-dom';
import getAverage from '../functions/getAverage';

const Table = ({ labels, diffiNums, satisNums }) => {

    //checks if currentpage = home studentPage or Opdrachtpage
    const location = useLocation();
    let currentPage = location.pathname.split('/')[1];

    const dispatch = useDispatch();
    const database = useSelector(state => state.database);

    //generates data to display in table
    const tableData = () => {
        const rows = [];

        labels.forEach(label => {
            const index = labels.indexOf(label);
            let averageDiff = diffiNums[index];
            let averageSatis = satisNums[index];
            let overallScore = getAverage([averageDiff, averageSatis]);

            //if undefined, null or empty assign value = '-'
            if (!overallScore) {
                overallScore = '-';
            }

            if (!averageDiff) {
                averageDiff = '-';
            }

            if (!averageSatis) {
                averageSatis = '-';
            }

            const columns = {
                title: label,
                diffiNum: averageDiff,
                satisNum: averageSatis,
                overallScore,
                id: index
            };

            rows.push(columns);
        });

        return rows;
    };

    //retreives opdracht data to be displayed on opdrachtPage
    const handleClick = (opdracht) => {
        //initialise object with opdr Title
        const selectedOpdracht = { opdracht };

        const metrics = ['satisScore', 'diffiScore'];
        metrics.forEach(metric => {
            //get student ratings per metric
            const ratings = getStudentRatings(database, opdracht, metric);
            selectedOpdracht[metric] = ratings;
        });

        //update state with opdracht data
        dispatch(setOpdrChartData(selectedOpdracht));
    };


    return (
        <div className='table-container'>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>difficulty score:</th>
                        <th>satisfaction score:</th>
                        <th>overall score:</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData().map(row => {
                        /*if currentPage = homepage or studentPage
                        titles = (clickable) list of opdrachten */
                        if (currentPage !== 'OpdrachtPage') {
                            return (
                                <tr key={row.id}>
                                    <th onClick={() => {
                                        dispatch(resetData())
                                        handleClick(row.title)
                                    }}>
                                        <Link to={`/OpdrachtPage/${row.title}`}>
                                            {row.title}
                                        </Link>
                                    </th>
                                    <td>{row.diffiNum}</td>
                                    <td>{row.satisNum}</td>
                                    <td>{row.overallScore}</td>
                                </tr>
                            )
                        } else {
                            /*if currentPage = opdrachtPage
                            titles = list of student Names */
                            return (
                                <tr key={row.id}>
                                    <th>{row.title}</th>
                                    <td>{row.diffiNum}</td>
                                    <td>{row.satisNum}</td>
                                    <td>{row.overallScore}</td>
                                </tr>
                            )
                        }

                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Table;