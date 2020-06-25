export default function addWord(array, newWord) {
  const wordInArray = array.find((el) => {
    return el.id === newWord.id
  });
  if (!wordInArray) {
    array.push(newWord);
  }
}
