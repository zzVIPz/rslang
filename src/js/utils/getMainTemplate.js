export default function getMainTemplate(user, data, achievements) {
  return `
    <div class="user-info container">
      <h3 class="user-info__title">${data.title}
        <span class="user-info__username">${user.username}</span>
      </h3>
      <p class="user-info__subtitle">${data.subtitle}</p>
      <div class="user-info__container wrapper">
        <p class="user-info__text">${data.totalCards}</p>
        <p class="user-info__value"> ${user.cardsTotal}</p>
      </div>
      <div class="user-info__container wrapper">
        <p class="user-info__text">${data.newWords}</p>
        <p class="user-info__value"> ${user.cardsNew}</p>
      </div>
      <div class="user-info__container wrapper">
        <p class="user-info__text">${data.studyMode}</p>
        <p class="user-info__value">${user.studyMode}</p>
      </div>
      <p class="user-info__subtitle">${data.achievements}</p>
      <div class="user-info__container wrapper">
        <p class="user-info__text">${data.passedWords}</p>
        <p class="user-info__value">${achievements.allUserWords} out of ${data.amountCards}</p>
      </div>
      <div class="user-info__container wrapper">
        <p class="user-info__text">${data.learnedWords}</p>
        <p class="user-info__value">${achievements.learnedWords}</p>
      </div>
      <div class="user-info__container wrapper">
        <p class="user-info__text">${data.progress}</p>
        <p class="user-info__value">
          ${+((achievements.learnedWords * 100) / data.amountCards).toFixed(2)}%
        </p>
      </div>
      <div class="user-info__buttons wrapper">
        <button class="user-info__button btn-start">${data.btnStart}</button>
      </div>
    </div>`;
}
