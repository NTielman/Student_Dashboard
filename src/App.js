import './App.css';
import React, { useEffect } from 'react';
import { setData, setStudents, setAssignmnts } from './actions';
import { useDispatch } from 'react-redux';
import Dashboard from './components/Dashboard';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {

      //fetch data from csv file
      const response = await fetch('/Data/student-data.csv');
      const data = await response.text();

      //initialise empty arrays to hold data info
      const studentNames = [];
      const opdrachtenLijst = [];
      const database = [];

      //split the data by line break and remove (slice) headers
      const row = data.split('\n').slice(1);

      row.forEach(value => {
        //split each row value by comma
        const column = value.split(',');

        const student = column[0];
        const opdrTitle = column[1];
        const difficulty = +column[2];
        const satisfying = +column[3];
        const studentObj = {
          name: student, //Evelyn
          isActive: true, //sets student checkbox as checked
          data: [{ title: opdrTitle, diffiScore: difficulty, satisScore: satisfying }],
          id: database.length + 1 //sets student id 
        };

        //if studentarray doesn't include student yet, add student 
        if (!studentNames.includes(student)) {
          studentNames.push(student);
        }

        //if opdrachtenLijst doesn't include opdracht yet, add opdracht 
        if (!opdrachtenLijst.includes(opdrTitle)) {
          opdrachtenLijst.push(opdrTitle);
        }

        //checks if database already includes studentObject
        if (database.find(obj => obj.name === student)) {

          //find student obj
          const foundStudent = database.find(obj => obj.name === student);

          //make copy of student projects data
          const copyData = foundStudent.data;

          //add new opdracht to students opdrachtenLijst
          const opdrObj = { title: opdrTitle, diffiScore: difficulty, satisScore: satisfying };
          foundStudent.data = [...copyData, opdrObj];

        } else {
          //add student to database
          database.push(studentObj);
        }

      });

      //send data to reducers to initialise state
      dispatch(setAssignmnts(opdrachtenLijst));
      dispatch(setStudents(studentNames));
      dispatch(setData(database));

    }

    getData();
  }, []);

  return (
    <Dashboard />
  );
}

export default App;