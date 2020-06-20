const CONST_MAIN_VIEW = {
  menuItems: [
    'main-page',
    'dictionary',
    'statistics',
    'speakit',
    'english-puzzle',
    'savannah',
    'audiocall',
    'sprint',
    'new-game',
    'promo-page',
    'about-team',
    'log-out',
  ],
};

const getNavLinkTemplate = (key) => {
  const formattedKey = key.replace('-', ' ').toUpperCase();
  return `
    <li class="navigation__item">
      <a class="navigation__link" data-name=${key} href="#${key}">${formattedKey}</a>
    </li>`;
};

const getUserSetting = (userData) => ({
  wordsPerDay: userData.cardsTotal,
  optional: {
    user: JSON.stringify(userData),
  },
});

const getModalSettingsTemplate = (user) => `
<div class="settings">
  <h3 class="settings__title">Welcome, ${user.username}</h3>
  <p class="settings__subtitle">Here you can set up your study profile</p>
  <div class="settings__cards-amount wrapper">
    <label class="settings__label" for="cards-amount">Choose the total number of cards per day (5 - 100):</label>
    <input class="settings__input" type="number" id="cards-amount" min="5" max="100" value="${
      user.cardsTotal
    }">
  </div>
  <div class="settings__word-amount wrapper">
    <label class="settings__label" for="word-amount">
      Choose the number of new words per day (5 - the total number of cards per day):
    </label>
    <input class="settings__input" type="number" id="word-amount" min="5" max="${
      user.cardsTotal
    }" value="${user.cardsNew}">
  </div>
  <div class="settings__study-mode wrapper">
    <p class="settings__description">Which study mode do you prefer?</p>
    <select class="settings__study-select">
      <option ${user.studyMode === 'learning' ? 'selected' : ''} >new words</option>
      <option ${user.studyMode === 'repetition' ? 'selected' : ''}>repetition</option>
      <option ${user.studyMode === 'mixed' ? 'selected' : ''}>mixed</option>
    </select>
  </div>
  <div class="settings__text-mode wrapper">
    <p class="settings__description">How do you prefer to learn words?</p>
    <select class="settings__text-select">
      <option ${user.learningWordsMode === 'word' ? 'selected' : ''}>word</option>
      <option ${user.learningWordsMode === 'meaning' ? 'selected' : ''}>text meaning</option>
      <option ${user.learningWordsMode === 'example' ? 'selected' : ''}>text example</option>
      <option ${user.learningWordsMode === 'mixed' ? 'selected' : ''}>mixed</option>
    </select>
  </div>
  <div class="settings__transcription wrapper">
    <label class="settings__label" for="transcription">Show word transcription</label>
    <input type="checkbox" id="transcription" ${user.transcription ? 'checked' : ''}>
  </div>
  <div class="settings__associative-picture wrapper">
    <label class="settings__label" for="associative-picture">Show associative picture</label>
    <input type="checkbox" id="associative-picture" ${user.associativePicture ? 'checked' : ''}>
  </div>
  <div class="settings__button-i-know wrapper">
    <label class="settings__label" for="button-i-know">Show button 'I know'</label>
    <input type="checkbox" id="button-i-know" ${user.btnKnow ? 'checked' : ''}>
  </div>
  <div class="settings__button-difficult wrapper">
    <label class="settings__label" for="button-difficult">Show button 'Difficult'</label>
    <input type="checkbox" id="button-difficult" ${user.btnDifficult ? 'checked' : ''}>
  </div>
  <div class="settings__buttons">
    <button class="settings__button btn-accept">Accept</button>
    <button class="settings__button btn-cancel">Cancel</button>
  </div>
</div>`;

export { CONST_MAIN_VIEW, getNavLinkTemplate, getUserSetting, getModalSettingsTemplate };
