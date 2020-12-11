import React from 'react';

const SortMenu = () => {
    return (
        <div className='sort-menu-container'>
            <ul className="sort-menu">
                <p>Sort By:</p>
                <li>difficulty <i className="fas fa-sort-amount-down-alt"></i></li>
                <li>satisfaction <i className="fas fa-sort-amount-down-alt"></i></li>
                <li>name/ title <i className="fas fa-sort-alpha-down"></i></li>
            </ul>
        </div>
    );

}

export default SortMenu;