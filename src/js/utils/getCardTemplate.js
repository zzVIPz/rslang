import getMediaUrl from './getMediaUrl';
import getRandomInteger from './getRandomInteger';
import getFormattedString from './getFormattedString';
import { SETTING_MODAL_TEXT, WORD_LEARNING_MODES } from '../constants/constMainView';

const CARD_TEXT = {
  newWord: 'New word',
  btnBeFamiliar: 'I KNOW',
  btnToStudy: 'DIFFICULT WORD',
  btnShowAnswer: 'SHOW ANSWER',
  btnCheck: 'CHECK',
  pattern: '[A-Za-z]',
};

export default function getCardTemplate(card, settings) {
  console.log(card);
  console.log(settings);
  let wordMode = true;
  let textMeaningMode = true;
  let textExampleMode = true;
  let { learningWordsMode } = settings;

  if (learningWordsMode === SETTING_MODAL_TEXT.textSelect.mixed) {
    learningWordsMode = WORD_LEARNING_MODES[getRandomInteger(0, 2)];
  }

  if (learningWordsMode === SETTING_MODAL_TEXT.textSelect.word) {
    textMeaningMode = !textMeaningMode;
    textExampleMode = !textExampleMode;
  }
  if (learningWordsMode === SETTING_MODAL_TEXT.textSelect.textMeaning) {
    wordMode = !wordMode;
    textExampleMode = !textExampleMode;
  }
  if (learningWordsMode === SETTING_MODAL_TEXT.textSelect.textExample) {
    wordMode = !wordMode;
    textMeaningMode = !textMeaningMode;
  }
  const wordContent = `
    <p class="card__text-translate ${wordMode && settings.translate ? '' : 'hidden'}">
      ${card.wordTranslate}
    </p>
    <audio class="audio" src="${getMediaUrl(card.audio)}" preload="auto"></audio>`;

  const textMeaningContent = `
    <p class="card__text-translate ${textMeaningMode && settings.translate ? '' : 'hidden'}">
      ${card.textMeaningTranslate}
    </p>
    <audio class="audio" src="${getMediaUrl(card.audioMeaning)}" preload="auto"></audio>`;

  const textExampleContent = `
    <p class="card__text-translate ${textExampleMode && settings.translate ? '' : 'hidden'}">
      ${card.textExampleTranslate}
    </p>
    <audio class="audio" src="${getMediaUrl(card.audioExample)}" preload="auto"></audio>`;

  const word = getFormattedString(card.word, wordMode, wordContent);
  const textMeaning = getFormattedString(card.textMeaning, textMeaningMode, textMeaningContent);
  const textExample = getFormattedString(card.textExample, textExampleMode, textExampleContent);

  return `
  <div class="swiper-slide card container">
    <p class="card__state">${CARD_TEXT.newWord}</p>
    <div class="card__image-container ${settings.associativePicture ? '' : 'hidden'}" >
      <img class="card__image" src="${getMediaUrl(card.image)}">
    </div>
    <p class="card__transcription ${settings.transcription ? '' : 'hidden'}">
      ${card.transcription}</p>
    ${word}
    ${textMeaning}
    ${textExample}
    <div class ="card__buttons-container">
      <button class="card__know ${settings.btnKnow ? '' : 'hidden'}">
        ${CARD_TEXT.btnBeFamiliar}
      </button>
      <button class="card__study ${settings.btnDifficult ? '' : 'hidden'}">
        ${CARD_TEXT.btnToStudy}
      </button>
      <button class="card__show-answer ${settings.btnShowAnswer ? '' : 'hidden'}">
        ${CARD_TEXT.btnShowAnswer}
      </button>
    </div>
    <div>
    <button class="card__btn-check">${CARD_TEXT.btnCheck}</button>
  </div>`;
}
