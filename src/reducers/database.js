const database = (state = [], action) => {

    switch (action.type) {

        case 'SET-DATA':

            //get fetched data
            const database = action.payload;

            //update state
            return database;

        case 'SELECTED-STUDENT':

            //get selected student
            const selectedStudent = action.payload;

            //copy state and deselect other students
            const deselectedStudents = state.map(student => {
                if (student.name !== selectedStudent) {
                    student.isActive = false;
                    return student;
                } else {
                    student.isActive = true;
                    return student;
                }
            });

            //update state
            return deselectedStudents;

        case 'TOGGLE-STUDENT':

            //get selected student
            const { value } = action.payload;

            //find student in database
            const foundStudent = state.find(student => student.name === value);

            //check/uncheck student
            foundStudent.isActive = !foundStudent.isActive;

            //copy state and add updated student 
            const newState = state.map(student => {
                if (student.name !== value) {
                    return student;
                } else {
                    return foundStudent;
                }
            });

            //update state
            return newState;

        case 'RESET-DATA':

            //copy and reset state
            const resetState = state.map(student => {
                student.isActive = true;
                return student;
            });

            //update state
            return resetState;

        default:

            return state;
    }

}

export default database;