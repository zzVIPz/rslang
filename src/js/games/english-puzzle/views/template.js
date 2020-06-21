const template = `
      <div class="english-puzzle">
        <div class="ep-controls">
          <div class="ep-controls__left-side">
            <label class="ep-label">
              Level
              <select class="ep-select" name="levelSelect">
                <option value="value1">1</option> 
                <option value="value2" selected>2</option>
                <option value="value3">3</option>
              </select>
            </label>
            <label class="ep-label">
              Page
              <select class="ep-select" name="pageSelect">
                <option value="value1">1</option> 
                <option value="value2">2</option>
                <option value="value3" selected>3</option>
              </select>
            </label>
          </div>
          <div class="ep-controls__right-side">
            <div class="ep__button tips__button tips__button_autospeech"></div>
            <div class="ep__button tips__button tips__button_translate"></div>
            <div class="ep__button tips__button tips__button_speech"></div>
            <div class="ep__button tips__button tips__button_background"></div>
          </div>
        </div>
        <div class="ep-tips">
          <div class="ep__button tips__button tips__button_autospeech-grey"></div>
          <p id="sentenceTranslate" class="ep-tips__text-translate"><p>
        </div>
        <div class="ep-board"></div>
        <div id="playField" class="ep-play__field ep-board__line drag-container"></div>
        <div class="ep-play__buttons">
          <button id="skipBtn" class="ep__button" name="skip">I don't know</button>
          <button id="checkBtn" class="ep__button ep-hidden" name="check">Check</button>
          <button id="continueBtn" class="ep__button ep-hidden" name="continue">Continue</button>
        </div>
      </div>
      `;

export default template;
