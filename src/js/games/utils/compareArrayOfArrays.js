/* export default function compareArrayOfArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i += 1) {
    if (arr1[i].length !== arr2[i].length) {
      return false;
    }
    for (let j = 0; j < arr1[i].length; j += 1) {
      if (arr1[i][j] !== arr2[i][j]) {
        return false;
      }
    }
  }

  return true;
} */

const compareArrayOfArrays = (arr1, arr2) => JSON.stringify(arr1) === JSON.stringify(arr2);

export default compareArrayOfArrays;
