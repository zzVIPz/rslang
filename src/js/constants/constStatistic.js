const DEFAULT_STATISTIC = {
  learnedWords: 0,
  optional: {
    games: {
      speak: 0, puzzle: 0, call: 0, savanna: 0, sprint: 0, newGame: 0,
    },
    progress: {},
  },
};

export default DEFAULT_STATISTIC;
export const CHART_CONTAINER = '<div id="chartContainer" style="height: 600px; width: 90%;"></div>';
export const SECONDS_IN_DAY = 86400000;
export const GRID_DENSITY = 100;
