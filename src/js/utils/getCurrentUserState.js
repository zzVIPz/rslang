export default function getCurrentUserState() {
  const totalCards = document.getElementById('cards-amount');
  const wordAmount = document.getElementById('word-amount');
  const modeSelect = document.querySelector('.settings__study-select');
  const textSelect = document.querySelector('.settings__text-select');
  const transcription = document.getElementById('transcription');
  const translate = document.getElementById('translate');
  const associativePicture = document.getElementById('associative-picture');
  const wordPronunciation = document.getElementById('word-pronunciation');
  const textPronunciation = document.getElementById('text-pronunciation');
  const btnKnow = document.getElementById('button-i-know');
  const btnDifficult = document.getElementById('button-difficult');
  const btnShowAnswer = document.getElementById('show-answer');
  return {
    cardsTotal: +totalCards.value,
    cardsNew: +wordAmount.value,
    studyMode: modeSelect.options[modeSelect.selectedIndex].value,
    learningWordsMode: textSelect.options[textSelect.selectedIndex].value,
    transcription: transcription.checked,
    translate: translate.checked,
    associativePicture: associativePicture.checked,
    wordPronunciation: wordPronunciation.checked,
    textPronunciation: textPronunciation.checked,
    btnKnow: btnKnow.checked,
    btnDifficult: btnDifficult.checked,
    btnShowAnswer: btnShowAnswer.checked,
  };
}
