import getDifficultyLevelRoundId from './getDifficultyLevelID';

export default function getLevelsId(element, view, model) {
  element.addEventListener('click', ({ target }) => {
    const v = view;
    let level = null;
    const m = model;
    if (target.classList.contains('group')) {
      level = getDifficultyLevelRoundId(target);
      m.levelNumForUser = level + 1;
      v.level = level;
    }
  });
}
