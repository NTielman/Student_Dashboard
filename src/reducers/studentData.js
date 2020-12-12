const studentData = (state = [], action) => {

    switch (action.type) {

        //sets initial state
        case 'SET-DATA':

            //get data from fetch
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

            //get checked/unchecked student
            const { value } = action.payload;
            const foundStudent = state.find(student => student.name === value);
            foundStudent.isActive = !foundStudent.isActive;

            const copyState = state.map(student => {
                if (student.name !== value) {
                    return student;
                } else {
                    return foundStudent;
                }
            });
            //update state
            return copyState;

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

export default studentData;