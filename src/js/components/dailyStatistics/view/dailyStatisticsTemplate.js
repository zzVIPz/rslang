const dailyStatisticsTemplate = (data, aggregatedWords) => `
  <div class="statistics">
    <div>Total Words: 3600</div>
    <div>Learned Words: ${data.learnedWords}</div>
    <div>Progress: ${((data.learnedWords / 3600) * 100).toFixed(2)}%</div>
    <div>
      <span>Game starts:</span>
      <div>AudioCall: ${data.optional.games.audiocall}</div>
      <div>English Puzzle: ${data.optional.games.englishPuzzle}</div>
      <div>Savannah: ${data.optional.games.savannah}</div>
      <div>SpeakIt: ${data.optional.games.speakit}</div>
      <div>Sprint: ${data.optional.games.sprint}</div>
      <div>Word Search: ${data.optional.games.wordSearch}</div>
    </div>
    <div>
      <span>Statistic by words:</span>
      <div>Easy Words: ${aggregatedWords.easy}</div>
      <div>Difficult Words: ${aggregatedWords.difficult}</div>
      <div>Repeat Words: ${aggregatedWords.repeat}</div>
    </div>
    <div>
      <canvas id="statisticsChart"></canvas>
    </div>
  </div>
`;

export default dailyStatisticsTemplate;
