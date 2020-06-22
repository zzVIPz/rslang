export default function getCorrectUrl(page, group, amount) {
  const url = amount
    ? `https://afternoon-falls-25894.herokuapp.com/words?group=${group}&page=${page}&wordsPerExampleSentenceLTE=${amount}&wordsPerPage=${amount}`
    : `https://afternoon-falls-25894.herokuapp.com/words?group=${group}&page=${page}`;
  return url;
}
