//returns student ratings for a specific opdracht and metric (difficulty | satisfaction)
const getStudentRatings = (database, opdrachtTitle, metric) => {
    const ratings = [];

    database.forEach(studentObj => {

        //check if student is selected/ should be included
        if (studentObj.isActive) {

            //find specific opdracht
            const opdracht = studentObj.data.find(opdr => opdr.title === opdrachtTitle);

            //find metric info of opdracht difficultyNumber | satisfactionNumber
            const metricNum = opdracht[metric];
            ratings.push(metricNum);
        }

    });

    return ratings;
}

export default getStudentRatings;