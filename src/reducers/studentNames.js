const studentNames = (state = [], action) => {

    switch (action.type) {

        case 'SET-STUDENTS':

            const students = action.payload;
            return students;
        default:

            return state;
    }

}

export default studentNames;