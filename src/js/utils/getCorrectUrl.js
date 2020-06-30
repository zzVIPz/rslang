export default function getCorrectUrl(page, group, amount, wordsPerExample = 50) {
  const url = amount
    ? ` http://pacific-castle-12388.herokuapp.com/words?group=${group}&page=${page}&wordsPerExampleSentenceLTE=${wordsPerExample}&wordsPerPage=${amount}`
    : ` http://pacific-castle-12388.herokuapp.com/words?group=${group}&page=${page}`;
  return url;
}
