/* action usedBy: App | affected reducer: database  */
// sets student database
export const setDatabase = (studentData) => {
    return {
        type: 'SET-DATA',
        payload: studentData,
    }
}

/* action usedBy: App | affected reducer: studentNames  */
// sets student navbar
export const setStudents = (students) => {
    return {
        type: 'SET-STUDENTS',
        payload: students,
    }
}

/* action usedBy: App | affected reducer: chartData  */
// sets chart labels and chart data
export const setChartData = (dataArray) => {
    return {
        type: 'SET-CHART-DATA',
        payload: dataArray,
    }
}

/* action usedBy: App, Table | affected reducer: assignmentChartData  */
// sets assignmentChart labels and data
export const setAssignmentChartData = (dataArray) => {
    return {
        type: 'SET-ASSIGNMENT-CHART-DATA',
        payload: dataArray,
    }
}

/* action usedBy: Nav | affected reducer: chartData  */
// updates chart labels and data
export const updateChart = (database) => {
    return {
        type: 'UPDATE-CHART',
        payload: database,
    }
}

/* action usedBy: Nav | affected reducer: assignmentChartData  */
// updates assignmentChart labels and data
export const updateAssignmentChart = (database) => {
    return {
        type: 'UPDATE-ASSIGNMENT-CHART',
        payload: database,
    }
}

/* action usedBy: Nav | affected reducer: database  */
// unchecks all students except selectedStudent
export const selectStudent = (studentName) => {
    return {
        type: 'SELECTED-STUDENT',
        payload: studentName,
    }
}

/* action usedBy: Nav | affected reducer: database  */
// checks/ unchecks a student
export const toggleStudent = (student) => {
    return {
        type: 'TOGGLE-STUDENT',
        payload: student,
    }
}

/* action usedBy: SortMenu | affected reducer: chartData  */
// sort chart by selected parameter
export const sortChart = (param) => {
    return {
        type: 'SORT-CHART',
        payload: param,
    }
}

/* action usedBy: SortMenu | affected reducer: assignmentChartData  */
// sort assignmentChart by selected parameter
export const sortAssignmentChart = (param) => {
    return {
        type: 'SORT-ASSIGNMENT-CHART',
        payload: param,
    }
}

/* action usedBy: Nav, Table | affected reducer: database  */
// resets database
export const resetData = () => {
    return {
        type: 'RESET-DATA'
    }
}