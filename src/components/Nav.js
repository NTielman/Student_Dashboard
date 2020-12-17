/* -------------- Displays Navbar of studentNames -------------- */
import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectStudent, resetData, toggleStudent, updateChart, updateOpdrChart } from '../actions';

const Nav = () => {

    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    //initialise Nav state as empty array
    const [menuItems, setMenuItems] = useState([]);

    //get menuItems (studentNames) from Store
    const studentNames = useSelector(state => state.studentNames);
    const database = useSelector(state => state.database);

    //when data has been fetched and sent to Store, update Nav menuItems
    useEffect(() => {

        setMenuItems(studentNames);

        return () => {
            //takes user to homepage on page reload
            /* studentPage and opdrachtPage receive data dynamically (onClick) 
            from user interaction. To avoid errors or a blank page 
            on page reload (no click event = no received data), 
            always redirect user to homepage on page reload*/
            history.push('/');
        }
    }, [studentNames]);

    //checks if currentpage = homePage, studentPage or opdrachtpage
    let currentPage = location.pathname.split('/')[1];

    //checks if student checkbox should be checked
    const studentIsChecked = name => {
        const foundStudent = database.find(student => student.name === name);

        //returns true or false
        return foundStudent.isActive;
    };

    return (
        <nav>
            <ul className='nav-links'>
                <li className='nav-listItem home-listItem'>
                    <Link to='/'
                        onClick={() => {
                            dispatch(resetData()) //reselects all students
                            dispatch(updateChart(database)) //updates homePage charts
                        }}>
                        Home
                    </Link>
                </li>

                {menuItems.map(student => {
                    return (
                        <li className='nav-listItem'
                            key={student}>
                            <label>
                                <input
                                    type="checkbox"
                                    name="studentname"
                                    className="checkbox"
                                    checked={studentIsChecked(student)}
                                    onChange={(event) => {
                                        dispatch(toggleStudent(event.target))
                                        if (currentPage === 'OpdrachtPage') {
                                            dispatch(updateOpdrChart(database))
                                        } else {
                                            dispatch(updateChart(database))
                                        }
                                    }}
                                    value={student}>
                                </input>
                                <span className='custom-checkbox'></span>
                                <Link to={`/StudentPage/${student}`}
                                    id={student}
                                    onClick={(event) => {
                                        dispatch(selectStudent(event.target.id))
                                        dispatch(updateChart(database))
                                    }}>
                                    {student}
                                </Link>
                            </label>
                        </li>
                    )
                })}

            </ul>
        </nav>
    );
}

export default Nav;