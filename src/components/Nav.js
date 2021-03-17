/* -------------- Displays Navbar of studentNames -------------- */
import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectStudent, resetData, toggleStudent, updateChart, updateAssignmentChart } from '../actions';

const Nav = () => {

    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const [menuItems, setMenuItems] = useState([]);
    const studentNames = useSelector(state => state.studentNames);
    const database = useSelector(state => state.database);

    //after data has been fetched, update Nav items
    useEffect(() => {

        setMenuItems(studentNames);
        return () => {
            //takes user to homepage on page reload
            /* studentPage and assignmentPage receive data dynamically 
            from user interaction. To avoid a blank page 
            on page reload (no click event = no received data), 
            redirect user to homepage*/
            history.push('/');
        }
    }, [studentNames, history]);

    let currentPage = location.pathname.split('/')[1];

    const studentIsChecked = name => {
        const dbStudent = database.find(student => student.name === name);
        return dbStudent.isChecked;
    };

    return (
        <nav>
            <ul className='nav-links'>
                <li className='nav-listItem home-listItem'>
                    <Link to='/'
                        onClick={() => {
                            dispatch(resetData())
                            dispatch(updateChart(database))
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
                                        if (currentPage === 'AssignmentPage') {
                                            dispatch(updateAssignmentChart(database))
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