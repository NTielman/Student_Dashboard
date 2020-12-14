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

/* usedBy: Nav.js */
// for homepage resets dta to include all students
export const resetData = () => {
    return {
        type: 'RESET-DATA'
    }
}

/* usedBy: Nav.js */
// displays only selected student info
export const selectStudent = (studentName) => {
    return {
        type: 'SELECTED-STUDENT',
        payload: studentName,
    }
}

/* usedBy: Nav.js */
// includes/ excludes student data from charts
export const toggleStudent = (student) => {
    return {
        type: 'TOGGLE-STUDENT',
        payload: student,
    }
}

/* usedBy: App.js */
// sets initial assignments and projects (state)
export const setChartData = (assignments) => {
    return {
        type: 'SET-CHART-DATA',
        payload: assignments,
    }
}

/* usedBy: App.js */
// sets initial assignments and projects (state)
export const sortChart = (param) => {
    return {
        type: 'SORT-CHART',
        payload: param,
    }
}

/* usedBy: App.js */
// sets initial assignments and projects (state)
export const updateChart = (database) => {
    return {
        type: 'UPDATE-CHART',
        payload: database,
    }
}

/* usedBy: App.js */
// sets initial assignments and projects (state)
export const setOpChartData = (assignments) => {
    return {
        type: 'SET-OPDRACHT-CHART-DATA',
        payload: assignments,
    }
}

/* usedBy: App.js */
// sets initial assignments and projects (state)
export const sortOpChart = (param) => {
    return {
        type: 'SORT-OPDRACHT-CHART',
        payload: param,
    }
}

/* usedBy: App.js */
// sets initial assignments and projects (state)
export const updateOpChart = (database) => {
    return {
        type: 'UPDATE-OPDRACHT-CHART',
        payload: database,
    }
}