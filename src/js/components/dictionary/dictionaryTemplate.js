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
        <div class="dictModal__word">
          <div class="dict__word-audio"></div>
          <div class="dictModal__wordEnglish"></div>
          <div class="dictModal__wordTranscription"></div>
          <div class="dictModal__wordTranslate"></div>
        </div>
        <div class="dictModal__meaning">WORD MEANING</div>
        <div class="dictModal__textMeaning">
          <div class="dict__word-audio"></div>
        </div>
        <div class="dictModal__textMeaningTranslate"></div>
        <div class="dictModal__example">USAGE EXAMPLE</div>
        <div class="dictModal__textExample">
          <div class="dict__word-audio"></div>
        </div>
        <div class="dictModal__textExampleTranslate"></div>
        <div class="dictModal__closeBtn dictModal_hidden">Close</div>
      </div>
      <a id="modalClose" class="ep-close_app"></a>
    </div>
  </div>
`;

export default dictionaryTemplate;
