import sorter from '../functions/sorter';

const defaultState = {
    assignment: '',
    labels: [],
    diffiScore: [],
    satisScore: [],
    sortDirection: true
}

const assignmentChartData = (state = defaultState, action) => {

    switch (action.type) {

        case 'SET-ASSIGNMENT-CHART-DATA':

            const data = action.payload;
            return { ...state, ...data };
        case 'SORT-ASSIGNMENT-CHART':

            const param = action.payload;
            const sortedState = sorter(param, state);
            return {
                ...state,
                ...sortedState
            };
        case 'UPDATE-ASSIGNMENT-CHART':

            const database = action.payload;
            let newState = state;

            const metrics = ['diffiScore', 'satisScore'];
            metrics.forEach(metric => {

                const studentRatings = [];

                state.labels.forEach(studentName => {

                    const dbStudent = database.find(student => student.name === studentName);

                    if (dbStudent.isChecked) {
                        const studentAssignment = dbStudent.scores.find(assignment => assignment.title === state.assignment);
                        const metricScore = studentAssignment[metric];
                        studentRatings.push(metricScore);

                    } else {
                        studentRatings.push('');
                    }

                });
                newState = { ...newState, [metric]: studentRatings };

            });
            return newState;
        default:

            return state;
    }

}

export default assignmentChartData;