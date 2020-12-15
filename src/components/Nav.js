import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectStudent, resetData, toggleStudent, updateChart, updateOpChart } from '../actions';

const Nav = () => {
    const studentNames = useSelector(state => state.studentNames);
    const studentData = useSelector(state => state.studentData);

    //checks if student checkbox is checked
    const studentIsChecked = name => {
        const foundStudent = studentData.find(student => student.name === name);
        return foundStudent.isActive;
    };

    const [students, setStudents] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (studentNames.length !== 0) {
            setStudents(studentNames)
        }
    }, [studentNames]);

    return (
        <nav>
            <ul className='nav-links'>
                <li className='student-list-item home-li'>
                    <Link to='/'
                        onClick={() => {
                            dispatch(resetData())
                            dispatch(updateChart(studentData))
                        }}>
                        Home
                    </Link>
                </li>
                {students.map(student => {
                    return (<li
                        className='student-list-item'
                        key={student}>
                        <label>
                            <input
                                type="checkbox"
                                name="name"
                                className="checkbox"
                                checked={studentIsChecked(student)}
                                onChange={(event) => {
                                    dispatch(toggleStudent(event.target))
                                    dispatch(updateChart(studentData))
                                    dispatch(updateOpChart(studentData))
                                }}
                                id={students.indexOf(student) + 1}
                                value={student}>
                            </input>
                            <span className='custom-checkbox'></span>
                            <Link to={`/StudentPage/${student}`}
                                id={student}
                                onClick={(event) => {
                                    dispatch(selectStudent(event.target.id))
                                    dispatch(updateChart(studentData))
                                }}>
                                {student}
                            </Link>
                        </label>
                    </li>)
                })}
            </ul>
        </nav>
    );
}

export default Nav;