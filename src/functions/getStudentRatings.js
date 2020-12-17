/* -------- returns student ratings for a specific opdracht and metric -------- */
const getStudentRatings = (database, opdrachtTitle, metric) => {

    //will hold student ratings
    const ratings = [];

    database.forEach(student => {

        //if student is checked include student score
        if (student.isActive) {

            //find specific opdracht
            const opdracht = student.scores.find(opdr => opdr.title === opdrachtTitle);

            //find metric info (difficultyScore | satisfactionScore) of opdracht 
            const metricScore = opdracht[metric];
            ratings.push(metricScore);

        } else { //if student is unchecked, student score = ''

            ratings.push('');
        }

    });

    return ratings;
}

export default getStudentRatings;