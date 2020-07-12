export default function getIndexOfArr(outer, inner) {
  for (let i = 0; i < outer.length; i += 1) {
    let isFound = false;
    if (outer[i].length === inner.length) {
      isFound = true;
      for (let j = 0; j < inner.length; j += 1) {
        if (inner[j] !== outer[i][j]) {
          isFound = false;
          break;
        }
      }
    }

    if (isFound) {
      return i;
    }
  }

  return -1;
}
