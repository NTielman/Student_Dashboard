/* -------- returns a state object sorted by a specific parameter -------- */
const sorter = (param, state) => {

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

    /* to ensure labels match up with the correct data 
    after the change in volgorde, first 
    convert all array elements into objects */
    const sortedObjects = [];

    state.labels.forEach(label => {

        const index = state.labels.indexOf(label);
        const obj = {
            label,
            diffiScore: state.diffiScore[index],
            satisScore: state.satisScore[index]
        };

        sortedObjects.push(obj);
    });

    //sort objects by parameter
    sortedObjects.sort((a, b) => {

        const itemA = a[param];
        const itemB = b[param];

        if (state.sortDirection) {
            return sortDown(itemA, itemB);
        } else {
            return sortUp(itemA, itemB);
        }

    });

    //convert objects back into array elements
    const sortedLabels = [];
    const sortedDiffScores = [];
    const sortedSatScores = [];

    sortedObjects.forEach(obj => {

        sortedLabels.push(obj.label);
        sortedDiffScores.push(obj.diffiScore);
        sortedSatScores.push(obj.satisScore)

    });

    //return state object
    return {
        labels: sortedLabels,
        diffiScore: sortedDiffScores,
        satisScore: sortedSatScores,
        sortDirection: !state.sortDirection
    };

};

export default sorter;