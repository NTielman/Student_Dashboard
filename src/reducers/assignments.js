const assignments = (state = [], action) => {

    switch (action.type) {

        //sets initial state
        case 'SET-ASSIGNMENTS':

            //get data from fetch
            const assignmentsList = action.payload;

            //update state
            return assignmentsList;

        default:
            return state;
    }

}

export default assignments;