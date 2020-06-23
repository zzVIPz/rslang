import getMediaUrl from './getMediaUrl';
import getRandomInteger from './getRandomInteger';
import { SETTING_MODAL_TEXT, WORD_LEARNING_MODES } from '../constants/constMainView';

const CARD_TEXT = {
  newWord: 'New word',
  btnBeFamiliar: 'I KNOW',
  btnToStudy: 'TO STUDY',
  btnShowAnswer: 'SHOW ANSWER',
  btnCheck: 'CHECK',
};

export default function getCardTemplate(card, settings) {
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
  return `
  <div class="swiper-slide card container">
    <p class="card__state">${CARD_TEXT.newWord}</p>
    <div class="card__image-container ${settings.associativePicture ? '' : 'hidden'}" >
      <img class="card__image" src="${getMediaUrl(card.image)}">
    </div>
    <p class="card__text ${wordMode ? '' : 'hidden'}">${card.word}</p>
    <p class="card__transcription ${settings.transcription ? '' : 'hidden'}">
      ${card.transcription}</p>
    <p class="card__text ${wordMode ? '' : 'hidden'}">${card.wordTranslate}</p>
    <p class="card__text ${textMeaningMode ? '' : 'hidden'}">${card.textMeaning}</p>
    <p class="card__text ${textMeaningMode ? '' : 'hidden'}">${card.textMeaningTranslate}</p>
    <p class="card__text ${textExampleMode ? '' : 'hidden'}">${card.textExample}</p>
    <p class="card__text ${textExampleMode ? '' : 'hidden'}">${card.textExampleTranslate}</p>
    <div class ="card__buttons-container">
      <button class="card__know ${settings.btnKnow ? '' : 'hidden'}">
        ${CARD_TEXT.btnBeFamiliar}
      </button>
      <button class="card__study ${settings.btnDifficult ? '' : 'hidden'}">
        ${CARD_TEXT.btnToStudy}
      </button>
    </div>
    <div>
    <button class="card__show-answer">${CARD_TEXT.btnCheck} / ${CARD_TEXT.btnShowAnswer}</button>
  </div>`;
}
