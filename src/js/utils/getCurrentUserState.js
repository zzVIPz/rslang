export default function getCurrentUserState() {
  const totalCards = document.getElementById('cards-amount');
  const wordAmount = document.getElementById('word-amount');
  const modeSelect = document.querySelector('.settings__study-select');
  const textSelect = document.querySelector('.settings__text-select');
  const transcription = document.getElementById('transcription');
  const associativePicture = document.getElementById('associative-picture');
  const wordPronunciation = document.getElementById('word-pronunciation');
  const examplePronunciation = document.getElementById('example-pronunciation');
  const meaningPronunciation = document.getElementById('meaning-pronunciation');
  const btnKnow = document.getElementById('button-i-know');
  const btnDifficult = document.getElementById('button-difficult');
  return {
    cardsTotal: +totalCards.value,
    cardsNew: +wordAmount.value,
    studyMode: modeSelect.options[modeSelect.selectedIndex].value,
    learningWordsMode: textSelect.options[textSelect.selectedIndex].value,
    transcription: transcription.checked,
    associativePicture: associativePicture.checked,
    wordPronunciation: wordPronunciation.checked,
    examplePronunciation: examplePronunciation.checked,
    meaningPronunciation: meaningPronunciation.checked,
    btnKnow: btnKnow.checked,
    btnDifficult: btnDifficult.checked,
  };
}
