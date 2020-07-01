import getDifficultyLevelRoundId from './getDifficultyLevelID';
import randomInteger from './randomInteger';

export default function getRound(starsRound, view) {
  starsRound.addEventListener('click', ({ target }) => {
    const v = view;
    let round = null;
    if (target.classList.contains('round')) {
      round = getDifficultyLevelRoundId(target);
      round = round * 5 + randomInteger(0, 4);
      v.round = round;
    }
  });
}
