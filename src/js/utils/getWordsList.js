import { AMOUNT_WORDS_PER_PAGE } from '../constants/constMainView';

export default async function getWordsList(
  { currentPage, currentGroup },
  totalPagesRequest,
  fnGetWords,
) {
  const wordsList = [];
  let currentPageTmp = currentPage;
  let currentGroupTmp = currentGroup;
  for (let i = 0; i < totalPagesRequest; i += 1) {
    const partWordsList = fnGetWords(currentPageTmp, currentGroupTmp);

    wordsList.push(partWordsList);
    currentPageTmp += 1;
    if (currentPageTmp > AMOUNT_WORDS_PER_PAGE) {
      currentPageTmp = 0;
      currentGroupTmp += 1;
    }
  }
  const result = await Promise.all(wordsList);

  return result.flat();
}
