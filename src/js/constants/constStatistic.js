export const DEFAULT_STATISTIC = {
  learnedWords: 0,
  optional: {
    games: { 'speak': 2, 'puzzle': 3, 'call': 4, 'savanna': 5, 'sprint': 6, 'search': 7 },
    progress: {}
  },
};

export const DEFAULT_STATISTIC2 = {
  learnedWords: 0,
  optional: {
    games: { 'speak': 0, 'puzzle': 0, 'call': 0, 'savanna': 0, 'sprint': 0, 'newGame': 0 }, 
    progress: {
      '7/1/2020' : 10,
      '7/2/2020' : 20,
      '7/3/2020' : 50,
      '7/4/2020' : 70,
      '7/5/2020' : 80,
      '7/6/2020' : 100,
      '7/7/2020' : 123,
      '7/8/2020' : 131,
      '7/9/2020' : 144,
      '7/10/2020' : 158,
      '7/16/2020' : 499,
      '7/17/2020' : 534,
      '7/19/2020' : 578,
      '7/23/2020' : 699,
      '7/31/2020' : 712,
      '8/12/2020' : 911,
      '1/12/2021' : 1165,
    }
  },
};
export const CHART_CONTAINER = `<div id="chartContainer" style="height: 600px; width: 90%;"></div>`
export const SECONDS_IN_DAY = 86400000;
export const GRID_DENSITY = 100;