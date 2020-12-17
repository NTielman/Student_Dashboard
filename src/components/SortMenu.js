import React from 'react';
import { useDispatch } from 'react-redux';
import { sortChart, sortOpChart } from '../actions';
import { useLocation } from 'react-router-dom';

const SortMenu = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    //checks if currentpage = home studentPage or Opdrachtpage
    let currentPage = location.pathname.split('/')[1];

    const handleClick = (metric) => {
        if (currentPage === 'OpdrachtPage') {
            dispatch(sortOpChart(metric))
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