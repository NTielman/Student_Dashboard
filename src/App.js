import './App.css';
import React, { useEffect } from 'react';
import { setData, setStudents, setChartData, setOpChartData } from './actions';
import { useDispatch } from 'react-redux';
import Dashboard from './components/Dashboard';
import getStudentRatings from './functions/getStudentRatings';
import getAverage from './functions/getAverage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {

      //fetch data from csv file
      const response = await fetch('/Data/student-data.csv');
      const data = await response.text();

      //declare and initialise empty arrays to hold data info
      const studentNames = [];
      const labels = [];
      const database = [];

      //split the data by line break and remove (slice) headers
      const row = data.split('\n').slice(1);

      row.forEach(value => {
        //split each row value by comma
        const column = value.split(',');

        const studentName = column[0];
        const opdrTitle = column[1];
        const difficulty = parseInt(column[2]);
        const satisfying = parseInt(column[3]);
        const studentObj = {
          name: studentName, //Evelyn
          isActive: true, //student checkbox is checked
          data: [{ title: opdrTitle, diffiScore: difficulty, satisScore: satisfying }],
          id: database.length + 1 //sets student id 
        };

        //if studentarray doesn't include student yet, add student 
        if (!studentNames.includes(studentName)) {
          studentNames.push(studentName);
        }

        //if opdrachtenLijst doesn't include opdracht yet, add opdracht 
        if (!labels.includes(opdrTitle)) {
          labels.push(opdrTitle);
        }

        //checks if database already includes studentObject
        if (database.find(student => student.name === studentName)) {

          //find student obj
          const foundStudent = database.find(student => student.name === studentName);

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

      //initialise object with opdr Titles
      const chartData = { labels };
      const metrics = ['diffiScore', 'satisScore'];

      //generates array of data to be sent to charts
      metrics.forEach(metric => {
        const numberArray = [];

        labels.forEach(opdracht => {
          //get average per opdracht
          const average = getAverage(getStudentRatings(database, opdracht, metric));
          numberArray.push(average);
        });

        chartData[metric] = numberArray;
      });

      //send data to reducers to initialise state
      dispatch(setChartData(chartData));
      dispatch(setStudents(studentNames));
      dispatch(setData(database));
      dispatch(setOpChartData({ labels: studentNames }));

    }

    getData();
  }, []);

  return (
    <Dashboard />
  );
}

export default App;