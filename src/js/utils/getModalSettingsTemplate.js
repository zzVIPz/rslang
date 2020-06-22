export default function getModalSettingsTemplate(user, settings) {
  return `
  <div class="settings animate__animated animate__backInDown">
    <h3 class="settings__title">${settings.title} ${user.username}</h3>
    <p class="settings__subtitle">${settings.subtitle}</p>
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
    <div class="settings__transcription wrapper">
      <label class="settings__label" for="transcription">${settings.transcription}</label>
      <input type="checkbox" id="transcription" ${user.transcription ? 'checked' : ''}>
    </div>
    <div class="settings__associative-picture wrapper">
      <label class="settings__label" for="associative-picture">
        ${settings.associativePicture}</label>
      <input type="checkbox" id="associative-picture" ${user.associativePicture ? 'checked' : ''}>
    </div>
    <div class="settings__button-i-know wrapper">
      <label class="settings__label" for="button-i-know">${settings.btnKnow}</label>
      <input type="checkbox" id="button-i-know" ${user.btnKnow ? 'checked' : ''}>
    </div>
    <div class="settings__button-difficult wrapper">
      <label class="settings__label" for="button-difficult">${settings.btnDifficult}</label>
      <input type="checkbox" id="button-difficult" ${user.btnDifficult ? 'checked' : ''}>
    </div>
    <div class="settings__word-pronunciation wrapper">
      <label class="settings__label" for="word-pronunciation">${settings.wordPronunciation}</label>
      <input type="checkbox" id="word-pronunciation" ${user.wordPronunciation ? 'checked' : ''}>
    </div>
    <div class="settings__meaning-pronunciation wrapper">
      <label class="settings__label" for="meaning-pronunciation">
        ${settings.meaningPronunciation}
      </label>
      <input type="checkbox" id="meaning-pronunciation"
        ${user.meaningPronunciation ? 'checked' : ''}>
    </div>
    <div class="settings__example-pronunciation wrapper">
      <label class="settings__label" for="example-pronunciation">
        ${settings.examplePronunciation}
      </label>
      <input type="checkbox" id="example-pronunciation"
      ${user.examplePronunciation ? 'checked' : ''}>
    </div>
    <div class="settings__buttons">
      <button class="settings__button btn-accept">${settings.btnAccept}</button>
      <button class="settings__button btn-cancel">${settings.btnCancel}</button>
    </div>
  </div>`;
}
