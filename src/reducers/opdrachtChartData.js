import sorter from '../functions/sorter';
import getStudentRatings from '../functions/getStudentRatings';

const defaultState = {
    opdracht: '',
    labels: [],
    diffiScore: [],
    satisScore: [],
    sortDirection: true
}

const opdrachtChartData = (state = defaultState, action) => {

    switch (action.type) {

        case 'SET-OPDRACHT-CHART-DATA':

            //get fetched data
            const data = action.payload;

            //update state with data
            return { ...state, ...data };

        case 'SORT-OPDRACHT-CHART':

            //get parameter to sort chart by (difficulty, satisfaction, label)
            const param = action.payload;

            //sort labels and data
            const sortedState = sorter(param, state);

            //update state with sorted stateObject
            return {
                ...state,
                ...sortedState
            };

        case 'UPDATE-OPDRACHT-CHART':

            //get data from  database
            const database = action.payload;

            //make copy of state
            let newState = state;

            //get difficultyScores | satisfactionScores for opdracht
            const metrics = ['diffiScore', 'satisScore'];
            metrics.forEach(metric => {

                //will hold student ratings per metric
                const ratings = [];

                state.labels.forEach(studentName => {

                    const foundStudent = database.find(student => student.name === studentName);

                    //if student is checked include student score
                    if (foundStudent.isActive) {

                        //find specific opdracht
                        const opdracht = foundStudent.scores.find(opdr => opdr.title === state.opdracht);

                        //find metric info (difficultyScore | satisfactionScore) of opdracht 
                        const metricScore = opdracht[metric];
                        ratings.push(metricScore);

                    } else { //if student is unchecked, student score = ''

                        ratings.push('');

                    }

                });

                //add ratings to state
                newState = { ...newState, [metric]: ratings };

            });

            //update state
            return newState;

        default:

            return state;
    }

}

export default opdrachtChartData;