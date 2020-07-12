/* eslint-disable no-underscore-dangle */
import CONSTANTS from '../dictionaryConstants';

const dictionaryLineTemplate = (data, audioSrc, user, state) => `
<div class="dict__word-card">
  <div class="dict__word-button dict__word-audio">
    <audio preload="auto" src="${audioSrc}"></audio>
  </div>
  <div class="dict__word-data-container">
    <div class="dict__word-line">
      <div class="dict__word-eng-trans">
        <div class="dict__word-english">${data.word}</div>
        <div class="dict__word-transcription ${user.transcription ? '' : 'hidden'}">${data.transcription}</div>
        <div class="dict__word-translate">—  ${data.wordTranslate}</div>
      </div>
    </div>
    <div class="dict__optional">
      <div class="dict__repeatCounter">Count of repeats: <span>${data.userWord.optional.repeatCounter}</span></div>
      <div class="dict__lastTimeRepeat">Last time repeat: <span>${new Date(data.userWord.optional.lastTimeRepeat).toString().slice(0, 15)}</span></div>
    </div>
  </div>
  <div class="dict__word-buttons-block">
    <div class="dict__word-button dict__word-information ${user.dictionaryInfo ? '' : 'hidden'}" data-id="${data._id}"></div>
    <div class="dict__word-button dict__word-difficult ${(user.dictionaryControl && (state === CONSTANTS.DICT_STATES.LEARNING)) ? '' : 'hidden'}" data-id="${data._id}"></div>
    <div class="dict__word-button dict__word-remove ${(user.dictionaryControl && (state === CONSTANTS.DICT_STATES.LEARNING)) ? '' : 'hidden'}" data-id="${data._id}"></div>
    <div class="dict__word-button dict__word-restore ${(user.dictionaryControl && (state === CONSTANTS.DICT_STATES.REMOVED || state === CONSTANTS.DICT_STATES.DIFFICULT)) ? '' : 'hidden'}" data-id="${data._id}"></div>
  </div>
</div>
`;

const dictionaryLastRepeatWord = (repeatCoef) => {
  const phrase = repeatCoef <= 1 ? 'at the next training' : `no later than at ${Math.ceil(repeatCoef)} training`;
  return `<div class="dict__lastTimeRepeat"> This word is repeat: <span>${phrase}</span> </div>`;
};

export { dictionaryLineTemplate, dictionaryLastRepeatWord };
