const dailyStatisticsTemplate = (data, aggregatedWords) => `
  <div class="statistics">
    <div class="statistics__wrapper">
      <div class="statistics__total">
        <div class="statistics-title">GENERAL STATISTICS</div>
        <div class="statistics__total-container">
          <div class="statistics__element">Total words: <span>3600</span></div>
          <div class="statistics__element">Learned words: <span>${aggregatedWords.easy}</span></div>
          <div class="statistics__element">Current progress: <span>${((aggregatedWords.easy / 3600) * 100).toFixed(2)}%</span></div>
        </div>
      </div>
      <div class="statistics__chart">
        <canvas id="statisticsChartGeneral"></canvas>
      </div>
      <div class="statistics__games">
        <div class="statistics-title">GAMES STARTS</div>
        <div class="statistics__games-container">
          <div class="statistics__element">AudioCall: <span>${data.optional.games.audiocall}</span></div>
          <div class="statistics__element">English Puzzle: <span>${data.optional.games.englishPuzzle}</span></div>
          <div class="statistics__element">Savannah: <span>${data.optional.games.savannah}</span></div>
        </div>
        <div class="statistics__games-container">
          <div class="statistics__element">SpeakIt: <span>${data.optional.games.speakit}</span></div>
          <div class="statistics__element">Sprint: <span>${data.optional.games.sprint}</span></div>
          <div class="statistics__element">Word Search: <span>${data.optional.games.wordSearch}</span></div>
        </div>
      </div>
      <div class="statistics__chart">
        <canvas id="statisticsChartGames"></canvas>
      </div>
      <div class="statistics__words">
        <div class="statistics-title">WORDS STATISTICS</div>
        <div class="statistics__words-container">
          <div class="statistics__element">Easy Words: <span>${aggregatedWords.easy}</span></div>
          <div class="statistics__element">Difficult Words: <span>${aggregatedWords.difficult}</span></div>
          <div class="statistics__element">Repeat Words: <span>${aggregatedWords.repeat}</span></div>
        </div>
      </div>
      <div class="statistics__chart">
        <canvas id="statisticsChartWords"></canvas>
      </div>
    </div>
  </div>
`;

export default dailyStatisticsTemplate;
