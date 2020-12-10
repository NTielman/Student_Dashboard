import './App.css';
// import '../public/test.csv';
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {

  async function getData() {
    const response = await fetch('test.csv');
    const data = await response.text();
    const studentNames = [];
    const opdrachten = [];
    const dataObj = [];

    const rows = data.split('\n').slice(1);
    rows.forEach(text => {

      const row = text.split(',');
      const student = row[0];
      const opdrTitle = row[1];
      const diffiNum = +row[2];
      const satisNum = +row[3];
      const studentObj = {
        name: student,
        isActive: true,
        data: [{ title: opdrTitle, difficulty: diffiNum, satisfaction: satisNum }],
        id: dataObj.length + 1
      };

      if (!studentNames.includes(student)) {
        studentNames.push(student);
      }

      if (!opdrachten.includes(opdrTitle)) {
        opdrachten.push(opdrTitle);
      }

      //if student already in array
      if (dataObj.find(obj => obj.name === student)) {

        //find student obj
        const foundStudent = dataObj.find(obj => obj.name === student);

        //make copy of projects data
        const copyData = foundStudent.data;

        //add new opdracht/project to array of opdrachten
        const opdrObj = { title: opdrTitle, difficulty: diffiNum, satisfaction: satisNum };
        foundStudent.data = [...copyData, opdrObj];

      } else {
        //add student to array
        dataObj.push(studentObj);
      }

    });

    const getGemmidelde = (array) => {

      if (array.length === 0) {
        console.log('error in getGemmidelde: received empty array');
      } else {
        const total = array.reduce((acc, val) => acc + val);
        const gem = total / array.length;
        return gem;
      }

    }

    const getOpdrArray = (opTitle, metric) => {
      const opdrachtArray = [];
      dataObj.forEach(obj => {

        //if student is selected
        if (obj.isActive) {
          //find opdracht
          const opdracht = obj.data.find(elt => elt.title === opTitle);
          //find metric diffiNum satisNum
          const metricNum = opdracht[metric];
          opdrachtArray.push(metricNum);
        }

      });

      if (opdrachtArray.length === 0) {
        console.log('error in getOpdrArray: no students selected');
      }
      return opdrachtArray;
    }

    const chartData = () => {
      const diffiNums = [];
      const satisNums = [];

      opdrachten.forEach(opdr => {
        //get gemmiddelde per opdracht
        const gem = getGemmidelde(getOpdrArray(opdr, 'difficulty'))
        const opdrDataObj = { title: opdr, diffiNum: gem };
        diffiNums.push(opdrDataObj);
      });

      opdrachten.forEach(opdr => {
        //get gemmiddelde per opdracht
        const gem = getGemmidelde(getOpdrArray(opdr, 'satisfaction'))
        const opdrDataObj = { title: opdr, satisNum: gem };
        satisNums.push(opdrDataObj);
      });

    };

    const opdrachtData = (opdr) => {
      const opdrSatCijfers = [];
      const opdrDifCijfers = [];

      const satArray = getOpdrArray(opdr, 'satisfaction');
      const diffArray = getOpdrArray(opdr, 'difficulty');

      for (let n = 0; n < satArray.length; n++) {

        const obj = { student: studentNames[n], satisNum: satArray[n] };
        opdrSatCijfers.push(obj);
      }

      for (let n = 0; n < diffArray.length; n++) {

        const obj = { student: studentNames[n], diffiNum: diffArray[n] };
        opdrDifCijfers.push(obj);
      }

    };

    opdrachtData('SCRUM');

  }

  getData();

  return (
    <div className="App">
      hello
    </div>
  );
}

export default App;