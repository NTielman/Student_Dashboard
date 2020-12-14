const defaultState = {
    opdracht: '',
    labels: [],
    diffiScore: [],
    satisScore: [],
    sortDirection: true
}

const opdrachtChartData = (state = defaultState, action) => {

    switch (action.type) {

        //sets initial state
        case 'SET-OPDRACHT-CHART-DATA':

            //get data from fetch
            const data = action.payload;

            //update state
            return { ...state, ...data };

        case 'SORT-OPDRACHT-CHART':

            const param = action.payload;

            //make copy of state
            const stateDupli = state;
            const objArray = [];

            //sorts from A-Z a-z 1-5
            const sortDown = (itemA, itemB) => {

                if (itemA < itemB) {
                    return -1;
                }
                if (itemA > itemB) {
                    return 1;
                }
                return 0;
            };

            //sorts from Z-A z-a 5-1
            const sortUp = (itemA, itemB) => {

                if (itemA > itemB) {
                    return -1;
                }
                if (itemA < itemB) {
                    return 1;
                }
                return 0;
            };

            //make object out of arrays
            stateDupli.labels.forEach(label => {
                const index = stateDupli.labels.indexOf(label);
                const obj = {
                    label: label,
                    diffiScore: stateDupli.diffiScore[index],
                    satisScore: stateDupli.satisScore[index]
                };
                objArray.push(obj);
            });

            //sort array by parameter
            objArray.sort((a, b) => {
                const numA = a[param];
                const numB = b[param];

                if (state.sortDirection) {
                    return sortDown(numA, numB);
                } else {
                    return sortUp(numA, numB);
                }

            });

            //deconstruct array of objects into object of arrays
            const sortedLabels = [];
            const sortedDiffs = [];
            const sortedSats = [];

            objArray.forEach(obj => {
                sortedLabels.push(obj.label);
                sortedDiffs.push(obj.diffiScore);
                sortedSats.push(obj.satisScore)
            });

            return {
                opdracht: state.opdracht,
                labels: sortedLabels,
                diffiScore: sortedDiffs,
                satisScore: sortedSats,
                sortDirection: !state.sortDirection
            }
        case 'UPDATE-OPDRACHT-CHART':

            if (state.opdracht !== '') {
                const database = action.payload;
                let tempState = state;
                const metrics = ['diffiScore', 'satisScore'];

                //generates array of data to be sent to charts
                metrics.forEach(metric => {
                    const ratings = [];

                    state.labels.forEach(student => {
                        //check if student is active
                        const foundStudent = database.find(prsn => prsn.name === student);

                        if (foundStudent.isActive) {

                            //find specific opdracht
                            const opdracht = foundStudent.data.find(opdr => opdr.title === state.opdracht);

                            //find metric info of opdracht difficultyNumber | satisfactionNumber
                            const metricNum = opdracht[metric];
                            ratings.push(metricNum);
                        } else {
                            ratings.push('');
                        }

                    });

                    tempState = { ...tempState, [metric]: ratings };
                });

                return tempState;

            }
            break;
        default:
            return state;
    }

}

export default opdrachtChartData;