const database = (state = [], action) => {

    switch (action.type) {

        case 'SET-DATA':

            const database = action.payload;
            return database;
        case 'SELECTED-STUDENT':

            const selectedStudent = action.payload;

            //copy state and deselect other students
            const deselectedStudents = state.map(student => {
                if (student.name !== selectedStudent) {
                    student.isChecked = false;
                    return student;
                } else {
                    student.isChecked = true;
                    return student;
                }
            });
            return deselectedStudents;
        case 'TOGGLE-STUDENT':

            const { value } = action.payload;
            const dbStudent = state.find(student => student.name === value);

            dbStudent.isChecked = !dbStudent.isChecked;
            const newState = state.map(student => {
                if (student.name !== value) {
                    return student;
                } else {
                    return dbStudent;
                }
            });
            return newState;
        case 'RESET-DATA':

            const resetState = state.map(student => {
                student.isChecked = true;
                return student;
            });
            return resetState;
        default:

            return state;
    }

}

export default database;