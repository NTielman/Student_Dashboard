const studentNames = (state = [], action) => {

    switch (action.type) {

        //sets initial state
        case 'SET-STUDENTS':

            //get studentdata from fetch
            const students = action.payload;

            //update state
            return students;

        default:
            return state;
    }

}

export default studentNames;