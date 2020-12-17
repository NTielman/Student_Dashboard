/* -------------- Renders a table -------------- */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setOpdrChartData, resetData } from '../actions';
import getStudentRatings from '../functions/getStudentRatings';
import getAverage from '../functions/getAverage';

const Table = ({ labels, diffiNums, satisNums }) => {

    const dispatch = useDispatch();
    const location = useLocation();

    //checks if currentpage = homePage, studentPage or Opdrachtpage
    let currentPage = location.pathname.split('/')[1];

    const tableData = () => {

        //will hold tableData objects for each row
        const rows = [];

        /* to ensure labels match up with the correct data 
        convert all array elements into objects */
        labels.forEach(label => {

            const index = labels.indexOf(label);
            let averageDiff = diffiNums[index];
            let averageSatis = satisNums[index];
            let overallScore = getAverage([averageDiff, averageSatis]);

            //if any dataValues are undefined or null, value = '-'
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

    //onClick retreives opdracht scores from database and sets opdrachtChart state
    const database = useSelector(state => state.database);
    const handleClick = (opdracht) => {

        //create opdrachtObject to hold opdracht data
        const selectedOpdracht = { opdracht };

        const metrics = ['satisScore', 'diffiScore'];
        metrics.forEach(metric => {

            //get student ratings per metric
            const ratings = getStudentRatings(database, opdracht, metric);

            //add ratings to opdrachtObject
            selectedOpdracht[metric] = ratings;
        });

        //update opdrachtChart state with selected opdracht data
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
                                        dispatch(resetData()) //reselects all students
                                        handleClick(row.title) //retreives data to display on opdrachtPage
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