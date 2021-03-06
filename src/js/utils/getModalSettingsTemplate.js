export default function getModalSettingsTemplate(user, settings) {
  return `
    <div class="settings animate__animated animate__backInDown">
      <h3 class="settings__title">${settings.title} ${user.username}</h3>
      <p class="settings__subtitle">${settings.subtitle}</p>
      <p class="settings__text">${settings.textBasicSettings}</p>
      <div class="settings__cards-amount wrapper">
        <label class="settings__label" for="cards-amount">${settings.totalCards}</label>
        <input class="settings__input" type="number" id="cards-amount" min="5"
          max="100" value="${user.cardsTotal}">
      </div>
      <div class="settings__word-amount wrapper">
        <label class="settings__label" for="word-amount">${settings.cardsPerDay}</label>
        <input class="settings__input" type="number" id="word-amount" min="5"
          max="${user.cardsTotal}" value="${user.cardsNew}">
      </div>
      <div class="settings__study-mode wrapper">
        <p class="settings__description">${settings.studyMode}</p>
        <select class="settings__study-select">
          <option ${user.studyMode === settings.studySelect.newWords ? 'selected' : ''}>
            ${settings.studySelect.newWords}</option>
          <option ${user.studyMode === settings.studySelect.repeat ? 'selected' : ''}>
            ${settings.studySelect.repeat}</option>
          <option ${user.studyMode === settings.studySelect.difficult ? 'selected' : ''}>
            ${settings.studySelect.difficult}</option>
          <option ${user.studyMode === settings.studySelect.mixed ? 'selected' : ''}>
            ${settings.studySelect.mixed}</option>
        </select>
      </div>
      <div class="settings__text-mode wrapper">
        <p class="settings__description">${settings.textMode}</p>
        <select class="settings__text-select">
          <option ${user.learningWordsMode === settings.textSelect.word ? 'selected' : ''}>
            ${settings.textSelect.word}
          </option>
          <option ${user.learningWordsMode === settings.textSelect.textMeaning ? 'selected' : ''}>
            ${settings.textSelect.textMeaning}
          </option>
          <option ${user.learningWordsMode === settings.textSelect.textExample ? 'selected' : ''}>
            ${settings.textSelect.textExample}
          </option>
          <option ${user.learningWordsMode === settings.textSelect.mixed ? 'selected' : ''}>
            ${settings.textSelect.mixed}
          </option>
        </select>
      </div>
      <p class="settings__text">${settings.textAdditionalSettings}</p>
      <div class="settings__translate settings__wrapper">
        <input type="checkbox" id="translate" ${user.translate ? 'checked' : ''}>
        <label class="settings__label" for="translate">${settings.translate}</label>
      </div>
      <div class="settings__transcription settings__wrapper">
        <input type="checkbox" id="transcription" ${user.transcription ? 'checked' : ''}>
        <label class="settings__label" for="transcription">${settings.transcription}</label>
      </div>
      <div class="settings__associative-picture settings__wrapper">
        <input type="checkbox" id="associative-picture" ${user.associativePicture ? 'checked' : ''}>
        <label class="settings__label" for="associative-picture">
          ${settings.associativePicture}</label>
      </div>
      <div class="settings__block-i-know settings__wrapper">
        <input type="checkbox" id="button-i-know" ${user.btnKnow ? 'checked' : ''}>
        <label class="settings__label" for="button-i-know">${settings.btnKnow}</label>
      </div>
      <div class="settings__block-difficult settings__wrapper">
        <input type="checkbox" id="button-difficult" ${user.btnDifficult ? 'checked' : ''}>
        <label class="settings__label" for="button-difficult">${settings.btnDifficult}</label>
      </div>
      <div class="settings__block-show-answer settings__wrapper">
        <input type="checkbox" id="show-answer" ${user.btnShowAnswer ? 'checked' : ''}>
        <label class="settings__label" for="show-answer">${settings.btnShowAnswer}</label>
      </div>
      <div class="settings__block-show-additional-buttons settings__wrapper">
        <input type="checkbox" id="show-additional-buttons"
          ${user.additionalControl ? 'checked' : ''}>
        <label class="settings__label" for="show-additional-buttons">
          ${settings.btnAdditionalControl}
        </label>
      </div>
      <div class="settings__word-pronunciation settings__wrapper">
        <input type="checkbox" id="word-pronunciation" ${user.wordPronunciation ? 'checked' : ''}>
        <label class="settings__label" for="word-pronunciation">
          ${settings.wordPronunciation}</label>
      </div>
      <div class="settings__text-pronunciation settings__wrapper">
        <input type="checkbox" id="text-pronunciation"
          ${user.textPronunciation ? 'checked' : ''}>
        <label class="settings__label" for="text-pronunciation">
          ${settings.textPronunciation}
        </label>
      </div>
      <div class="settings__automatically-scroll settings__wrapper">
        <input type="checkbox" id="automatically-scroll"
          ${user.automaticallyScroll ? 'checked' : ''}>
        <label class="settings__label" for="automatically-scroll">
          ${settings.automaticallyScroll}</label>
      </div>
      <p class="settings__text">${settings.textDictionarySettings}</p>
      <div class="settings__block-dictionary-info settings__wrapper">
        <input type="checkbox" id="dictionary-info"
          ${user.dictionaryInfo ? 'checked' : ''}>
        <label class="settings__label" for="dictionary-info">
          ${settings.btnDictionaryInfo}
        </label>
      </div>
      <div class="settings__block-dictionary-control settings__wrapper">
        <input type="checkbox" id="dictionary-control"
          ${user.dictionaryControl ? 'checked' : ''}>
        <label class="settings__label" for="dictionary-control">
          ${settings.btnDictionaryControl}
        </label>
      </div>
      <div class="settings__buttons">
        <button class="settings__button btn-accept">${settings.btnAccept}</button>
        <button class="settings__button btn-cancel">${settings.btnCancel}</button>
      </div>
    </div>`;
}
