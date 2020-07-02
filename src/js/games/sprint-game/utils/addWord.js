export default function addWord(newArray, newWord, initialArray) {
  const initialWord = initialArray.find((el) => el.id === newWord.id);
  const wordInArray = newArray.find((el) => el.id === initialWord.id);

  if (!wordInArray) {
    newArray.push(initialWord);
  }
}
