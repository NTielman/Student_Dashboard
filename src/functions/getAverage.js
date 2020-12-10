//returns average from an array of numbers
const getAverage = (array) => {

    //check if received array is not empty
    if (array.length !== 0) {
        //add all numbers in array
        const total = array.reduce((acc, val) => acc + val);

        //divide total by amount of numbers in array
        const average = total / array.length;
        return average;
    }

};

export default getAverage;