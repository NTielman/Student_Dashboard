//returns average from an array of numbers
const getAverage = (array) => {

    const filteredArr = array.filter(num => num !== '');

    //check if received array is not empty
    if (filteredArr.length !== 0) {
        //add all numbers in array
        const total = filteredArr.reduce((acc, val) => acc + val);

        //divide total by amount of numbers in array
        const average = total / filteredArr.length;

        return Math.floor(average * 100) / 100;
    }

};

export default getAverage;