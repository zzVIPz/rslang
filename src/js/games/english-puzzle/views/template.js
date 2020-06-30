/* TODO: check and rename class names, remove useless attributes and then fix styles;
 replace left and right blocks elements between each other */
const template = `
      <div class="english-puzzle">
        <div class="ep-controls">
          <div class="ep-controls__left-side">
            <div id="tipTranslate" class="ep__button tips__button tips__button_translate"></div>
            <div id="tipSpeech" class="ep__button tips__button tips__button_speech"></div>
            <div id="tipBackground" class="ep__button tips__button tips__button_background"></div>
          </div>
          <div class="ep-controls__right-side">
            <label class="ep-label">
            Difficult
            <select id="difficultSelect" class="ep-select" name="difficultSelect">
              <option value="value1">1</option> 
              <option value="value2">2</option>
              <option value="value3">3</option>
              <option value="value4">4</option> 
              <option value="value5">5</option>
              <option value="value6">6</option>
            </select>
          </label>
          <label class="ep-label">
            Level
            <select id="levelSelect" class="ep-select" name="levelSelect">
              <option value="value1">1</option>
              <option value="value2">2</option>
              <option value="value3">3</option>
              <option value="value1">4</option>
              <option value="value2">5</option>
              <option value="value3">6</option>
              <option value="value1">7</option>
              <option value="value2">8</option>
              <option value="value3">9</option>
              <option value="value1">10</option>
              <option value="value1">11</option>
              <option value="value2">12</option>
              <option value="value3">13</option>
              <option value="value1">14</option>
              <option value="value2">15</option>
              <option value="value3">16</option>
              <option value="value1">17</option>
              <option value="value2">18</option>
              <option value="value3">19</option>
              <option value="value1">20</option>
              <option value="value1">21</option>
              <option value="value2">22</option>
              <option value="value3">23</option>
              <option value="value1">24</option>
              <option value="value2">25</option>
              <option value="value3">26</option>
              <option value="value1">27</option>
              <option value="value2">28</option>
              <option value="value3">29</option>
              <option value="value1">30</option>
              <option value="value1">31</option>
              <option value="value2">32</option>
              <option value="value3">33</option>
              <option value="value1">34</option>
              <option value="value2">35</option>
              <option value="value3">36</option>
              <option value="value1">37</option>
              <option value="value2">38</option>
              <option value="value3">39</option>
              <option value="value1">40</option>
              <option value="value1">41</option>
              <option value="value2">42</option>
              <option value="value3">43</option>
              <option value="value1">44</option>
              <option value="value2">45</option>
              <option value="value3">46</option>
              <option value="value1">47</option>
              <option value="value2">48</option>
              <option value="value3">49</option>
              <option value="value1">50</option>
              <option value="value1">51</option>
              <option value="value2">52</option>
              <option value="value3">53</option>
              <option value="value1">54</option>
              <option value="value2">55</option>
              <option value="value3">56</option>
              <option value="value1">57</option>
              <option value="value2">58</option>
              <option value="value3">59</option>
              <option value="value3">60</option>
            </select>
          </label>
            <a href="#" id="closeButton" class="ep-close ep-close_app"></a>
          </div>
        </div>
        <div class="ep-tips">
          <p id="sentenceTranslate" class="ep-tips__text-translate"></p>
        </div>
        <div class="ep-board-wrapper">
          <div class="ep-numbers"></div>
          <div id="board" class="ep-board"></div>
        </div>
        <div class="ep-wrapper">
          <div id="playField" class="ep-play__field ep-board__line drag-container"></div>
        </div>
        <div class="ep-play__buttons">
          <button id="skipBtn" class="ep__button" name="skip">I don't know</button>
          <button id="checkBtn" class="ep__button ep-hidden" name="check">Check</button>
          <button id="continueBtn" class="ep__button ep-hidden" name="continue">Continue</button>
          <button id="resultsBtn" class="ep__button ep-hidden" name="results">Results</button>
        </div>
        <div id="modal" class="ep-modal ep-modal_hidden">
          <div id="modalBody" class="ep-modal__body ep-modal_hidden">
            <div id="modalImage" class="ep-modal__image"></div>
            <div id="modalDescription" class="ep-modal__description"></div>
            <div id="modalMain" class="ep-modal__main">
              <div id="wrongWordsBlock" class="ep-modal__wrong-words">
                <div class="ep-modal__main-line">
                  I don't know
                  <div id="wrongWordsCount" class="ep-modal__wrong-words-count"></div>
                </div>
              </div>
              <div id="rightWordsBlock" class="ep-modal__right-words">
                <div class="ep-modal__main-line">
                  I know
                  <div id="rightWordsCount" class="ep-modal__right-words-count"></div>
                </div>
              </div>
            </div>
            <div class="ep-modal__buttons">
              <button id="modalContinueBtn" class="ep__button" name="modalContinue">Continue</button>
            </div>
          </div>
        </div>
      </div>
      `;

export default template;
