// deleteNth ([1,1,1,1],2) // return [1,1]
// deleteNth ([20,37,20,21],1) // return [20,37,21]
// #3 - [35, 20, 3, 17, 15, 22, 13, 36]
// #4 - [7, 26, 17, 3, 41, 33, 18, 48]

function deleteNth(arr, n) {
  console.log('-----------------------');
  let newArr = arr.slice(0);
  // loop through array
  arr.forEach(num => {
    let currentCount = 0; //reset current count
    // loop through array again for comparison
    arr.forEach((num2, index2) => {
      // if currentNum equals current number
      if (num === num2) {
        currentCount++;
        // if currentCount greater than allowed
        if (currentCount > n) {
          console.log(
            `Current count for ${num} at ${index2} is ${currentCount}`
          );
          // remove from array
          arr.splice(index2, 1);
        }
      }
    });
  });
  return arr;
}

//console.log(deleteNth([1, 1, 1, 1], 2));
//console.log(deleteNth([20, 37, 20, 21], 1));
console.log(
  deleteNth(
    [
      35,
      20,
      3,
      17,
      35,
      20,
      15,
      17,
      22,
      20,
      22,
      3,
      17,
      22,
      17,
      20,
      13,
      15,
      20,
      13,
      36,
      13,
      13,
      13,
      13,
      13,
      13,
      17,
      15,
      17,
      15,
      36,
      17,
      17,
      17,
      35,
      15,
      17,
      13,
      20,
      13,
      36,
      15
    ],
    1
  )
);
