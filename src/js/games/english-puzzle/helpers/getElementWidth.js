export default function getElementWidth(parentWidth, sentenceLettersCount, wordLength) {
  const ratio = (wordLength / sentenceLettersCount) * 100;
  const elementWidth = (parentWidth / 100) * ratio;
  return elementWidth;
}
