const studentData = (state = [], action) => {

    switch (action.type) {

        //sets initial state
        case 'SET-DATA':

            //get data from fetch
            const database = action.payload;

            //update state
            return database;

        default:
            return state;
    }

}

export default studentData;