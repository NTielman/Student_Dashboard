import React from 'react';
import { useDispatch } from 'react-redux';
import { sortChart, sortOpChart } from '../actions';

const SortMenu = () => {
    const dispatch = useDispatch();

    return (
        <div className='sort-menu-container'>
            <ul className="sort-menu">
                <p>Sort By:</p>
                <li
                    onClick={() => {
                        dispatch(sortChart('diffiScore'))
                        dispatch(sortOpChart('diffiScore'))
                    }}>difficulty <i className="fas fa-sort-amount-down-alt"></i>
                </li>
                <li
                    onClick={() => {
                        dispatch(sortChart('satisScore'))
                        dispatch(sortOpChart('satisScore'))
                    }}>satisfaction <i className="fas fa-sort-amount-down-alt"></i>
                </li>
                <li onClick={() => {
                    dispatch(sortChart('label'))
                    dispatch(sortOpChart('label'))
                }}>name/ title <i className="fas fa-sort-alpha-down"></i>
                </li>
            </ul>
        </div>
    );

}

export default SortMenu;