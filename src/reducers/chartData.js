import getStudentRatings from '../functions/getStudentRatings';
import getAverage from '../functions/getAverage';
import sorter from '../functions/sorter';

const defaultState = {
    labels: [],
    diffiScore: [],
    satisScore: [],
    sortDirection: true
}

const chartData = (state = defaultState, action) => {

    switch (action.type) {

        case 'SET-CHART-DATA':

            //get fetched data 
            const data = action.payload;

            //update state
            return { ...state, ...data };

        case 'SORT-CHART':

            //get parameter to sort chart by (difficulty, satisfaction, label)
            const param = action.payload;

            //sort labels and data
            const sortedState = sorter(param, state);

            return sortedState;

        case 'UPDATE-CHART':

            //get data from  database
            const database = action.payload;

            //make copy of state
            let prevState = state;

            const metrics = ['diffiScore', 'satisScore'];
            metrics.forEach(metric => {
                //will hold average difficultyScores | satisfactionScores for each opdracht 
                const updatedScores = [];

                //get average difficultyScore | satisfactionScore for each opdracht
                state.labels.forEach(opdracht => {
                    //get all studentRatings for the opdracht, then get average of studentRatings
                    const averageScore = getAverage(getStudentRatings(database, opdracht, metric));
                    updatedScores.push(averageScore);
                });

                //add updatedScores to copy of state
                prevState = { ...prevState, [metric]: updatedScores };
            });

            //update state with new scores
            return prevState;

        default:

            return state;
    }

}

export default chartData;