/* -------- returns the average of a numbers array -------- */
const getAverage = (numbersArray) => {

    //(if student is unchecked, score = ''), filter out uncheckedStudent scores
    const filteredScores = numbersArray.filter(score => score !== '');

    if (filteredScores.length > 0) {
        const totalScore = filteredScores.reduce((acc, val) => acc + val);
        const average = totalScore / filteredScores.length;
        return Math.floor(average * 100) / 100;
    }

};

export default getAverage;