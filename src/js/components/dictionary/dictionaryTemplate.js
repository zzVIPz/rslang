const dictionaryTemplate = `
  <div class="dictionary">
    <div class="dictionary__controls">
      <div class="controlsBtn" data-state="repeat">RepeatWords</div>
      <div class="controlsBtn" data-state="difficult">DifficultWords</div>
      <div class="controlsBtn" data-state="easy">EasyWords</div>
    </div>
    <div class="wordsData"></div>
    <div class="dictModal dictModal_hidden">
      <div class="dictModal__body">
        <div class="dictModal__image"></div>
        <div class="dictModal__textMeaning"></div>
        <div class="dictModal__textMeaningTranslate"></div>
      </div>
      <a class="dict-info-close"></a>
    </div>
  </div>
`;

export default dictionaryTemplate;
