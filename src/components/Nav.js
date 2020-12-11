import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Nav = () => {
    const studentNames = useSelector(state => state.studentNames);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        if (studentNames.length !== 0) {
            setStudents(studentNames)
        }
    }, [studentNames]);

    return (
        <nav>
            <ul className='nav-links'>
                <li>
                    <Link to='/'>
                        Home
                    </Link>
                </li>
                {students.map(student => {
                    return (<li key={student}>
                        <input
                            type="checkbox"
                            name="name"
                            className="checkbox"
                            // checked={activeFilters[genre]}
                            // onChange={(event) => dispatch(getFilters(event.target))}
                            id={students.indexOf(student) + 1}
                            value={student}>
                        </input>
                        <Link to={`/StudentPage/${student}`}>
                            {student}
                        </Link>
                    </li>)
                })}
            </ul>
        </nav>
    );
}

export default Nav;