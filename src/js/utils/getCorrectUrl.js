export default function getCorrectUrl(page, group, amount, wordsPerExample = 50) {
  const url = amount
    ? ` https://afternoon-falls-25894.herokuapp.com/words?group=${group}&page=${page}&wordsPerExampleSentenceLTE=${wordsPerExample}&wordsPerPage=${amount}`
    : ` https://afternoon-falls-25894.herokuapp.com/words?group=${group}&page=${page}`;
  return url;
}
