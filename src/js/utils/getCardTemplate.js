/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import getMediaUrl from './getMediaUrl';
import getRandomInteger from './getRandomInteger';
import getFormattedString from './getFormattedString';
import {
  SETTING_MODAL_TEXT,
  WORD_LEARNING_MODES,
  WORD_COMPLEXITY,
  CARD_TEXT,
} from '../constants/constMainView';

export default function getCardTemplate(card, settings) {
  const wordStatus = card.id ? CARD_TEXT.newWord : CARD_TEXT.repeat;
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

  const wordTranslate = `
  <p class="card__text-translate card__word-translate
    ${(textExampleMode || textMeaningMode) && settings.translate ? '' : 'hidden'}">
      ${card.wordTranslate.toUpperCase()}
  </p>`;

  const word = getFormattedString(card.word, wordMode, wordContent);
  const textMeaning = getFormattedString(
    card.textMeaning,
    textMeaningMode,
    textMeaningContent,
    wordTranslate,
  );
  const textExample = getFormattedString(
    card.textExample,
    textExampleMode,
    textExampleContent,
    wordTranslate,
  );

  return `
  <div class="swiper-slide card container" data-id=${card.id || card._id}>
    <div class="card__wrapper">
    <p class="card__state">${wordStatus}</p>
    <div class="card__image-container ${settings.associativePicture ? '' : 'hidden'}" >
      <img class="card__image" src="${getMediaUrl(card.image)}">
    </div>
    <p class="card__transcription ${settings.transcription ? '' : 'hidden'}">
      ${card.transcription}
    </p>
    ${word}
    ${textMeaning}
    ${textExample}
    <div class ="card__buttons-container">
      <button class="card__btn-know-word card__btn-primary ${settings.btnKnow ? '' : 'hidden'}">
        ${CARD_TEXT.btnBeFamiliar}
      </button>
      <button class="card__btn-difficult-word card__btn-primary
        ${settings.btnDifficult ? '' : 'hidden'}">
          ${CARD_TEXT.btnToStudy}
      </button>
      <button class="card__btn-show-answer card__btn-primary
        ${settings.btnShowAnswer ? '' : 'hidden'}">
          ${CARD_TEXT.btnShowAnswer}
      </button>
    </div>
    <div class ="card__additional-buttons-container hidden">
      <button class="card__btn-easy-word card__btn-additional">
        ${WORD_COMPLEXITY.easy}
      </button>
      <button class="card__btn-normal-word card__btn-additional">
        ${WORD_COMPLEXITY.normal}
      </button>
      <button class="card__btn-complex-word card__btn-additional">
        ${WORD_COMPLEXITY.difficult}
      </button>
      <button class="card__btn-repeat-again card__btn-additional">
        ${WORD_COMPLEXITY.repeat}
      </button>
    </div>
    <input type="submit" value="${CARD_TEXT.btnCheck}" class="card__btn-check">
    </div>
   </div>
  `;
}

// <button class="card__btn-check">${CARD_TEXT.btnCheck}</button>
