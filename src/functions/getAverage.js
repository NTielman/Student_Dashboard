/* -------- returns the average (gemiddelde) from an array of numbers -------- */
const getAverage = (numbersArray) => {

    //(if student is unchecked, score = ''), filter out uncheckedStudent scores
    const filteredArr = numbersArray.filter(score => score !== '');

    //check if received array is not empty
    if (filteredArr.length !== 0) {
        //add all numbers in array
        const total = filteredArr.reduce((acc, val) => acc + val);

        //divide total by amount of numbers in array
        const average = total / filteredArr.length;

        //round average to 2 decimals if necessary
        return Math.floor(average * 100) / 100;
    }

};

export default getAverage;