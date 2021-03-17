/* -------------- Displays menu of sort possibilities -------------- */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sortChart, sortAssignmentChart } from '../actions';

const SortMenu = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    let currentPage = location.pathname.split('/')[1];

    const handleClick = (metric) => {
        if (currentPage === 'AssignmentPage') {
            dispatch(sortAssignmentChart(metric))
        } else {
            dispatch(sortChart(metric))
        }
    };

    return (
        <div className='sort-menu-container'>
            <ul className="sort-menu">

                <p>Sort By:</p>

                <li
                    onClick={() => { handleClick('diffiScore') }}>
                    difficulty <i className="fas fa-sort-amount-down-alt"></i>
                </li>

                <li
                    onClick={() => { handleClick('satisScore') }}>
                    satisfaction <i className="fas fa-sort-amount-down-alt"></i>
                </li>

                <li onClick={() => { handleClick('label') }}>
                    name/ title <i className="fas fa-sort-alpha-down"></i>
                </li>

            </ul>
        </div>
    );
}

export default SortMenu;