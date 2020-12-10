/* usedBy: App.js */
// sets initial data (state)
export const setData = (studentData) => {
    return {
        type: 'SET-DATA',
        payload: studentData,
    }
}

/* usedBy: App.js */
// sets initial students (state)
export const setStudents = (studentNames) => {
    return {
        type: 'SET-STUDENTS',
        payload: studentNames,
    }
}

/* usedBy: App.js */
// sets initial assignments and projects (state)
export const setAssignmnts = (assignments) => {
    return {
        type: 'SET-ASSIGNMENTS',
        payload: assignments,
    }
}
