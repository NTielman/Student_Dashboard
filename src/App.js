/* -------------- Fetches Data and sets state for Charts -------------- */
import './App.css';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Dashboard from './components/Dashboard';
import getStudentRatings from './functions/getStudentRatings';
import getAverage from './functions/getAverage';
import { setDatabase, setStudents, setChartData, setAssignmentChartData } from './actions';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    const getData = async () => {

      // fetch data
      const response = await fetch(process.env.PUBLIC_URL + '/student_database/student-data.csv');
      const data = await response.text();

      const studentNames = [];
      const assignmentTitles = [];
      const database = [];

      // extract data
      const row = data.split('\n').slice(1);
      row.forEach(value => {
        const column = value.split(',');
        const studentName = column[0];
        const assignmentTitle = column[1];
        const difficultyScore = parseInt(column[2]);
        const satisfactionScore = parseInt(column[3]);
        const newStudent = {
          name: studentName,
          isChecked: true,
          scores: [{
            title: assignmentTitle,
            diffiScore: difficultyScore,
            satisScore: satisfactionScore
          }],
          id: database.length + 1 // set student id 
        };

        // add students to database
        if (database.find(student => student.name === studentName)) {
          const dbStudent = database.find(student => student.name === studentName);
          const studentAssignments = dbStudent.scores;
          const newAssignment = { title: assignmentTitle, diffiScore: difficultyScore, satisScore: satisfactionScore };
          dbStudent.scores = [...studentAssignments, newAssignment];
        } else {
          database.push(newStudent);
        }

        //add student names to nav bar
        if (!studentNames.includes(studentName)) {
          studentNames.push(studentName);
        }

        //add assignment titles to chart labels
        if (!assignmentTitles.includes(assignmentTitle)) {
          assignmentTitles.push(assignmentTitle);
        }
      });

      //create charts
      const chartData = { labels: assignmentTitles };
      const metrics = ['diffiScore', 'satisScore'];

      metrics.forEach(metric => {
        const scores = [];
        assignmentTitles.forEach(assignment => {
          const averageStudentScore = getAverage(getStudentRatings(database, assignment, metric));
          scores.push(averageStudentScore);
        });
        chartData[metric] = scores;
      });

      //set application state
      dispatch(setDatabase(database)); //database of all students and projectScores
      dispatch(setChartData(chartData)); //labels and data for charts
      dispatch(setStudents(studentNames)); //navigation menu of studentnames
      dispatch(setAssignmentChartData({ labels: studentNames })); //labels for assignmentCharts 
    }

    getData();

  }, []);

  return (
    <Dashboard />
  );
}

export default App;