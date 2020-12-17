/* -------------- Fetches Data and sets state for Charts -------------- */
import './App.css';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Dashboard from './components/Dashboard';
import getStudentRatings from './functions/getStudentRatings';
import getAverage from './functions/getAverage';
import { setDatabase, setStudents, setChartData, setOpdrChartData } from './actions';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    const getData = async () => {

      //fetch data from csv file
      const response = await fetch('/Data/student-data.csv');
      const data = await response.text();

      //declare and initialise empty arrays to hold data info
      const studentNames = [];
      const opdrTitles = [];
      const database = [];

      //split data by line break and remove headers (slice)
      const row = data.split('\n').slice(1);

      //get columns by splitting row values by comma
      row.forEach(value => {

        const column = value.split(',');
        const studentName = column[0];
        const opdrTitle = column[1];
        const difficultyScore = parseInt(column[2]);
        const satisfactionScore = parseInt(column[3]);
        const studentObj = {
          name: studentName, //bijv: Evelyn
          isActive: true, //student checkbox is checked
          scores: [{ //array of opdrachten and scores
            title: opdrTitle, //bijv: SCRUM
            diffiScore: difficultyScore, //bijv: 2
            satisScore: satisfactionScore //bijv: 3
          }],
          id: database.length + 1 //set student id 
        };

        //if database already includes studentObject
        if (database.find(student => student.name === studentName)) {
          //find student object
          const foundStudent = database.find(student => student.name === studentName);

          //make copy of student project scores 
          const scoresCopy = foundStudent.scores;

          //add new opdracht object to students opdrachtenLijst
          const newOpdracht = { title: opdrTitle, diffiScore: difficultyScore, satisScore: satisfactionScore };
          foundStudent.scores = [...scoresCopy, newOpdracht];

        } else {
          //if database doesn't include student yet, add student
          database.push(studentObj);
        }

        //make array of studentNames for Nav bar
        if (!studentNames.includes(studentName)) {
          studentNames.push(studentName);
        }

        //make array of opdracht titles for chart labels
        if (!opdrTitles.includes(opdrTitle)) {
          opdrTitles.push(opdrTitle);
        }
      });

      //create initial chartData object with available data
      const chartData = { labels: opdrTitles };
      const metrics = ['diffiScore', 'satisScore'];

      metrics.forEach(metric => {
        //will hold average difficultyScores | satisfactionScores for each opdracht 
        const scoresArray = [];

        //get average difficultyScore | satisfactionScore for each opdracht
        opdrTitles.forEach(opdracht => {
          //get all studentRatings for the opdracht, then get average of studentRatings
          const averageScore = getAverage(getStudentRatings(database, opdracht, metric));
          scoresArray.push(averageScore);
        });

        //bijv: chartData.difficultyScores = [2, 2, 5, 3]
        chartData[metric] = scoresArray;
      });

      //send data to reducers and set state(s)
      dispatch(setDatabase(database)); //database of all students and projectScores
      dispatch(setChartData(chartData)); //labels and data for charts
      dispatch(setStudents(studentNames)); //array of studentnames for Nav
      dispatch(setOpdrChartData({ labels: studentNames })); //labels for opdrachtCharts 

    }

    //call getData function
    getData();

    //leave dependency array empty, so useEffect only runs once
  }, []);

  return (
    <Dashboard />
  );
}

export default App;