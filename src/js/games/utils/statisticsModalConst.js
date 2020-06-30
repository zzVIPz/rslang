const STATISTICS_MODAL_LAYOUT = `
  <div class="statistics__title"></div>
  <div class="statistics__words-set">
    <div class="statistics__words-set_wrong">
      <div class="wrong_title">Ошибок</div>
    </div>
    <div class="statistics__words-set_correct">
      <div class="correct_title">Знаю</div>
    </div>
  </div>
  <div class="statistics__continue">Продолжить тренировку</div>
  <div class="statistics__back">Вернуться к списку тренировок</div>
`;

const LOSE_ROUND_TITLE = 'В этот раз не получилось, но продолжай тренироваться!';

const WIN_ROUND_TITLE = `
Так держать! Испытай себя на следующем раунде или уровне.`;

export {
  STATISTICS_MODAL_LAYOUT,
  LOSE_ROUND_TITLE,
  WIN_ROUND_TITLE,
};
