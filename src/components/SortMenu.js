import React from 'react';
import { useDispatch } from 'react-redux';
import { sortChart, sortOpChart } from '../actions';
import { useLocation } from 'react-router-dom';

const SortMenu = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    //checks if currentpage = home studentPage or Opdrachtpage
    let currentPage = location.pathname.split('/')[1];

    return (
        <div className='sort-menu-container'>
            <ul className="sort-menu">
                <p>Sort By:</p>
                <li
                    onClick={() => {
                        if (currentPage === 'OpdrachtPage') {
                            dispatch(sortOpChart('diffiScore'))
                        } else {
                            dispatch(sortChart('diffiScore'))
                        }
                    }}>difficulty <i className="fas fa-sort-amount-down-alt"></i>
                </li>
                <li
                    onClick={() => {
                        if (currentPage === 'OpdrachtPage') {
                            dispatch(sortOpChart('satisScore'))
                        } else {
                            dispatch(sortChart('satisScore'))
                        }
                    }}>satisfaction <i className="fas fa-sort-amount-down-alt"></i>
                </li>
                <li onClick={() => {
                    if (currentPage === 'OpdrachtPage') {
                        dispatch(sortOpChart('label'))
                    } else {
                        dispatch(sortChart('label'))
                    }
                }}>name/ title <i className="fas fa-sort-alpha-down"></i>
                </li>
            </ul>
        </div>
    );

}

export default SortMenu;