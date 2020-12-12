import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectStudent, resetData, toggleStudent } from '../actions';

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
                <li>
                    <Link to='/'
                        onClick={() => dispatch(resetData())}>
                        Home
                    </Link>
                </li>
                {students.map(student => {
                    return (<li
                        key={student}>
                        <input
                            type="checkbox"
                            name="name"
                            className="checkbox"
                            checked={studentIsChecked(student)}
                            onChange={(event) => dispatch(toggleStudent(event.target))}
                            id={students.indexOf(student) + 1}
                            value={student}>
                        </input>
                        <Link to={`/StudentPage/${student}`}
                            id={student}
                            onClick={(event) => {
                                dispatch(selectStudent(event.target.id))
                            }}>
                            {student}
                        </Link>
                    </li>)
                })}
            </ul>
        </nav>
    );
}

export default Nav;