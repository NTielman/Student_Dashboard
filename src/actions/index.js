/* action usedBy: App | affected reducer: database  */
// action to set initial database
export const setDatabase = (studentData) => {
    return {
        type: 'SET-DATA',
        payload: studentData,
    }
}

/* action usedBy: App | affected reducer: studentNames  */
// action to set initial student array
export const setStudents = (students) => {
    return {
        type: 'SET-STUDENTS',
        payload: students,
    }
}

/* action usedBy: App | affected reducer: chartData  */
// action to set chart labels and data
export const setChartData = (dataArray) => {
    return {
        type: 'SET-CHART-DATA',
        payload: dataArray,
    }
}

/* action usedBy: App, Table | affected reducer: opdrachtChartData  */
// action to set opdrachtChart labels and data
export const setOpdrChartData = (dataArray) => {
    return {
        type: 'SET-OPDRACHT-CHART-DATA',
        payload: dataArray,
    }
}

/* action usedBy: Nav | affected reducer: chartData  */
// action to update chart labels and data (on student toggle etc.)
export const updateChart = (database) => {
    return {
        type: 'UPDATE-CHART',
        payload: database,
    }
}

/* action usedBy: Nav | affected reducer: opdrachtChartData  */
// action to update opdrachtChart labels and data (on student toggle)
export const updateOpdrChart = (database) => {
    return {
        type: 'UPDATE-OPDRACHT-CHART',
        payload: database,
    }
}

/* action usedBy: Nav | affected reducer: database  */
// action to uncheck all students except selectedStudent
export const selectStudent = (studentName) => {
    return {
        type: 'SELECTED-STUDENT',
        payload: studentName,
    }
}

/* action usedBy: Nav | affected reducer: database  */
// action to check or uncheck a student (include | exclude student data from charts)
export const toggleStudent = (student) => {
    return {
        type: 'TOGGLE-STUDENT',
        payload: student,
    }
}

/* action usedBy: SortMenu | affected reducer: chartData  */
// action to sort chart by selected parameter
export const sortChart = (param) => {
    return {
        type: 'SORT-CHART',
        payload: param,
    }
}

/* action usedBy: SortMenu | affected reducer: opdrachtChartData  */
// action to sort opdrachtChart by selected parameter
export const sortOpdrChart = (param) => {
    return {
        type: 'SORT-OPDRACHT-CHART',
        payload: param,
    }
}

/* action usedBy: Nav, Table | affected reducer: database  */
// action to reset database (checks all students, includes all student data)
export const resetData = () => {
    return {
        type: 'RESET-DATA'
    }
}