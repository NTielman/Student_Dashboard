/* -------- returns student ratings for a specific assignment and metric -------- */
const getStudentRatings = (database, assignmentTitle, metric) => {

    const studentRatings = [];

    database.forEach(student => {

        if (student.isChecked) {
            const studentAssignment = student.scores.find(assignment => assignment.title === assignmentTitle);
            const metricScore = studentAssignment[metric];
            studentRatings.push(metricScore);

        } else {
            studentRatings.push('');
        }

    });

    return studentRatings;
}

export default getStudentRatings;