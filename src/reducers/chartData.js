import getStudentRatings from '../functions/getStudentRatings';
import getAverage from '../functions/getAverage';
import sorter from '../functions/sorter';

const defaultState = {
    labels: [],
    diffiScore: [],
    satisScore: [],
    sortUp: false
}

const chartData = (state = defaultState, action) => {

    switch (action.type) {

        case 'SET-CHART-DATA':

            const data = action.payload;
            return { ...state, ...data };
        case 'SORT-CHART':

            const param = action.payload;
            const sortedState = sorter(param, state);
            return sortedState;
        case 'UPDATE-CHART':

            const database = action.payload;
            let prevState = state;

            const metrics = ['diffiScore', 'satisScore'];
            metrics.forEach(metric => {

                const updatedScores = [];

                //get average difficultyScore | satisfactionScore for each assignment
                state.labels.forEach(assignment => {
                    const averageStudentScore = getAverage(getStudentRatings(database, assignment, metric));
                    updatedScores.push(averageStudentScore);
                });
                prevState = { ...prevState, [metric]: updatedScores };
            });
            return prevState;
        default:

            return state;
    }

}

export default chartData;