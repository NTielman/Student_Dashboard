const studentNames = (state = [], action) => {

    switch (action.type) {

        case 'SET-STUDENTS':

            //get fetched studentnames 
            const students = action.payload;

            //update state
            return students;

        default:

            return state;
    }

}

export default studentNames;