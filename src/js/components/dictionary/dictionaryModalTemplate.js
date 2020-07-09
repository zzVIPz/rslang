const dictionaryModalTemplate = (data, imageSrc, audioSrc, audioExample, audioMeaning, user) => `
  <div class="dictModal">
    <div class="dictModal__body animate__animated animate__backInDown">
      <div class="dictModal__image ${user.associativePicture ? '' : 'hidden'}">
        <img src="${imageSrc}">
      </div>
      <div class="dictModal__word">
        <div class="dict__word-audio">
          <audio src="${audioSrc}"></audio>
        </div>
        <div class="dictModal__wordEnglish">${data.word}</div>
        <div class="dictModal__wordTranscription ${user.transcription ? '' : 'hidden'}">${data.transcription}</div>
        <div class="dictModal__wordTranslate">${data.wordTranslate}</div>
      </div>
      <div class="dictModal__meaning">WORD MEANING</div>
      <div class="dictModal__textMeaning">
        <div class="dict__word-audio">
          <audio src="${audioMeaning}"></audio>
        </div>
        <p>${data.textMeaning}</p>
      </div>
      <div class="dictModal__textMeaningTranslate">${data.textMeaningTranslate}</div>
      <div class="dictModal__example">USAGE EXAMPLE</div>
      <div class="dictModal__textExample">
        <div class="dict__word-audio">
          <audio src="${audioExample}"></audio>
        </div>
        <p>${data.textExample}</p>
      </div>
      <div class="dictModal__textExampleTranslate">${data.textExampleTranslate}</div>
      <div class="dictModal__closeBtn">CLOSE</div>
    </div>
  </div>
`;

export default dictionaryModalTemplate;
