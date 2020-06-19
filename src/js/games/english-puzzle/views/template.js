const template =  `
      <div class="english-puzzle">
        <div class="ep-controls">
          <div class="ep-controls__left-side">
            <label>
              Level
              <select name="levelSelect">
                <option value="value1">1</option> 
                <option value="value2" selected>2</option>
                <option value="value3">3</option>
              </select>
            </label>
            <label>
              Page
              <select name="pageSelect">
                <option value="value1">1</option> 
                <option value="value2">2</option>
                <option value="value3" selected>3</option>
              </select>
            </label>
          </div>
          <div class="ep-controls__right-side">
            <div class="ep-controls__btn autospeech"></div>
            <div class="ep-controls__btn tips"></div>
            <div class="ep-controls__btn speechsentence"></div>
            <div class="ep-controls__btn bg-image"></div>
          </div>
        </div>
        <div class="ep-tips">
          <div class="ep-controls__btn autospeech-grey"></div>
          <p class="ep-tips__text-translate">Some text from current sentence<p>
        </div>
        <div class="mockData"></div>
        <div class="ep-playground"></div>
        <div class="ep-play__buttons">
          <button class="ep-play__btn" name="skip">I don't know</button>
          <button class="ep-play__btn" name="check">Check</button>
        </div>
      </div>
      `;

export default template;
