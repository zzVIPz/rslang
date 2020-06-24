export default function getMainTemplate(user, data) {
  return `
    <div class="user-info container">
      <h3 class="user-info__title">${data.title} ${user.username}</h3>
      <p class="user-info__subtitle">${data.subtitle}</p>
      <div class="user-info__container wrapper">
        <p class="user-info__text">${data.totalCards}</p>
        <p class="user-info__text"> ${user.cardsTotal}</p>
      </div>
      <div class="user-info__container wrapper">
        <p class="user-info__text">${data.newWords}</p>
        <p class="user-info__text"> ${user.cardsNew}</p>
      </div>
      <div class="user-info__container wrapper">
        <p class="user-info__text">${data.studyMode}</p>
        <p class="user-info__text">${user.studyMode}</p>
      </div>
      <p class="user-info__subtitle">${data.achievements}</p>
      <div class="user-info__container wrapper">
        <p class="user-info__text">${data.learnedWords}</p>
        <p class="user-info__text"></p>
      </div>
      <div class="user-info__container wrapper">
        <p class="user-info__text">${data.repeatWord}</p>
        <p class="user-info__text"></p>
      </div>
      <div class="user-info__buttons wrapper">
      <button class="user-info__button btn-start">${data.btnStart}</button>
      <button class="user-info__button btn-show-graph">${data.btnShowGraph}</button>
    </div>
    </div>`;
}
