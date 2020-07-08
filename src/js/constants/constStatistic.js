const DEFAULT_STATISTIC = {
  learnedWords: 0,
  optional: {
    games: {
      speak: 0,
      puzzle: 0,
      call: 0,
      savanna: 0,
      sprint: 0,
      search: 0,
    },
  },
};

const CHART_CONTAINER = `<div id="chartContainer" style="height: 500px; width: 100%;"></div>`

export {
  DEFAULT_STATISTIC,
  CHART_CONTAINER,
};
