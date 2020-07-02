const template = `
      <div class="english-puzzle ep-background">
      <div class="english-puzzle__wrapper">
        <div class="ep-controls">
          <div class="ep-controls__left-side">
            <div id="tipTranslate" class="tips__button tips__button_translate"></div>
            <div id="tipSpeech" class="tips__button tips__button_speech"></div>
            <div id="tipBackground" class="tips__button tips__button_background"></div>
          </div>
          <div class="ep-controls__right-side">
            <label class="ep-label">
            Difficult
            <select id="difficultSelect" class="ep-select" name="difficultSelect">
              <option>1</option> 
              <option>2</option>
              <option>3</option>
              <option>4</option> 
              <option>5</option>
              <option>6</option>
            </select>
          </label>
          <label class="ep-label">
            Level
            <select id="levelSelect" class="ep-select" name="levelSelect">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
              <option>13</option>
              <option>14</option>
              <option>15</option>
              <option>16</option>
              <option>17</option>
              <option>18</option>
              <option>19</option>
              <option>20</option>
              <option>21</option>
              <option>22</option>
              <option>23</option>
              <option>24</option>
              <option>25</option>
              <option>26</option>
              <option>27</option>
              <option>28</option>
              <option>29</option>
              <option>30</option>
              <option>31</option>
              <option>32</option>
              <option>33</option>
              <option>34</option>
              <option>35</option>
              <option>36</option>
              <option>37</option>
              <option>38</option>
              <option>39</option>
              <option>40</option>
              <option>41</option>
              <option>42</option>
              <option>43</option>
              <option>44</option>
              <option>45</option>
              <option>46</option>
              <option>47</option>
              <option>48</option>
              <option>49</option>
              <option>50</option>
              <option>51</option>
              <option>52</option>
              <option>53</option>
              <option>54</option>
              <option>55</option>
              <option>56</option>
              <option>57</option>
              <option>58</option>
              <option>59</option>
              <option>60</option>
            </select>
          </label>
            <a id="closeButton" class="ep-close_app"></a>
          </div>
        </div>
        <div class="ep-tips">
          <p id="sentenceTranslate" class="ep-tips__text-translate"></p>
        </div>
      <div class="container-outer">
        <div class="ep-numbers"></div>
      <div class="container-inner">
        <div class="ep-board-wrapper">
          <div id="board" class="ep-board"></div>
        </div>
        <div class="ep-wrapper">
          <div id="playField" class="ep-play__field ep-board__line drag-container"></div>
        </div>
      </div>
      </div>
        <div class="ep-play__buttons">
          <button id="skipBtn" class="ep__button">I don't know</button>
          <button id="checkBtn" class="ep__button ep-hidden">Check</button>
          <button id="continueBtn" class="ep__button ep-hidden">Continue</button>
          <button id="resultsBtn" class="ep__button ep-hidden">Results</button>
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
              <button id="modalContinueBtn" class="ep__button">Continue</button>
            </div>
          </div>
        </div>
      </div>
      </div>
      `;

export default template;
