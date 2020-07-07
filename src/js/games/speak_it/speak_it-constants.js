const START_PAGE = `
<div class="app speakIt_game">
    <div class="header_close">
      <a href="#" class="close speakIt_close"></a>
    </div>
    <div class="raiting_container">
      <div class="raiting_row rating_group ">
        <label class="group star" id="0"></label>
        <label class="group star" id="1"></label>
        <label class="group star" id="2"></label>
        <label class="group star" id="3"></label>
        <label class="group star" id="4"></label>
        <label class="group star" id="5"></label>
      </div>
      <div class="text_raiting">Уровень сложности</div>
    <div class="raiting_row rating_round">
      <label class="round star" id="0"></label>
      <label class="round star" id="1"></label>
      <label class="round star" id="2"></label>
      <label class="round star" id="3"></label>
      <label class="round star" id="4"></label>
      <label class="round star" id="5"></label>
    </div>
    <div class="text_raiting">Раунд</div>
  </div>
    <div class="app__content">
      <div class="app__content__title speakIt_title">Speak it simply</div>
      <div class="app__content__text">Потренируйся в произношении слов</div>
      <button class="app__button">Начать</button>
    </div>
  </div>`;

const PRELOADER = `
<div class="preloader_cont speakIt_game"> 
    <div class="preloader">
      <div class="item-1"></div>
      <div class="item-2"></div>
      <div class="item-3"></div>
      <div class="item-4"></div>
      <div class="item-5"></div>
    </div>
    <div class="preloader__info">
      <img class="keyboard" src="../src/assets/images/keyboard.png">
      <span class="preloader__info_text">Тренируйся в произношении слов</span>
    </div>
</div>`;

const STATISTICS_MODAL_LAYOUT = `
  <div class="statistics__title">Попробуй еще раз!</div>
  <div class="statistics__words_speak">
    <div class="statistics__words-set_wrong">
      <div class="wrong_title">Ошибок</div>
    </div>
    <div class="statistics__words-set_correct">
      <div class="correct_title">Знаю</div>
    </div>
    <div class="statistics__continue">Продолжить тренировку</div>
    <div class="statistics__back">Вернуться к списку тренировок</div>
  </div>`;

const ONE_START = ' <label class="group gold" id="0"></label>';
const QUANTITY_MISS_RIGHT_ANWS = 1;
const QUANTITY_STARS_NEXT_LEVEL = 10;
const GAME_PAGE = ` <div class="app speakIt_game">
                      <div class="header_close">
                        <a href="#" class="close speakIt_close"></a>
                      </div>
                      <div class="raiting_container">
                        <div class="raiting_row rating_group ">
                          <label class="group star" id="0"></label>
                          <label class="group star" id="1"></label>
                          <label class="group star" id="2"></label>
                          <label class="group star" id="3"></label>
                          <label class="group star" id="4"></label>
                          <label class="group star" id="5"></label>
                        </div>
                        <div class="text_raiting">Уровень сложности</div>
                        <div class="raiting_row rating_round">
                          <label class="round star" id="0"></label>
                          <label class="round star" id="1"></label>
                          <label class="round star" id="2"></label>
                          <label class="round star" id="3"></label>
                          <label class="round star" id="4"></label>
                          <label class="round star" id="5"></label>
                        </div>
                        <div class="text_raiting">Раунд</div>
                        <div class="level result"></div>
                      </div>
                      <div class="container_over">
                        <div class="card_over">
                          <div class="front">
                            <div class="content">
                              <div class="image"></div>
                            </div>
                          </div>
                          <div class="back">
                            <div class="content">
                              <p class="examples text_mean"></p>
                              <p class="tanslations translate_mean"></p>
                              <p class="examples text_explain"></p>
                              <p class="tanslations tarnslate_explain"></p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p class="translation">Перевод слова</p>
                      <div class="inner_container not_display">
                        <div class="mic icon"></div>
                        <div class="inner"></div>
                        <div class="clear icon"></div>
                      </div>
                      <div class="modal_container not_display">
                        <div class="modal_window">
                          <div class="app__modal__box_title">Вы действительно хотите выйти?</div>
                          <div class="app__modal__box_text"></div>
                          <div class="button modal_view">Посмотреть результаты</div>
                          <div class="button modal_close">Закрыть</div>
                          <div class="button modal_cancel">Отмена</div>
                        </div>
                      </div>

                      <div class="modal_statistic not_display modal_window">
                        <div class="statistics__title"></div>
                        <div class="statistics__words-set">
                          <div class="statistics__words-set_wrong">
                            <div class="wrong_title">Ошибок</div>
                          </div>
                          <div class="statistics__words-set_correct">
                            <div class="correct_title">Знаю</div>
                          </div>
                        </div>
                        <div class="statistics__continue">Продолжить тренировку</div>
                        <div class="statistics__back">Вернуться к списку тренировок</div>                  
                      </div>
                      <div class="words_container"></div>
                      <div class="button_container">
                        <button class="button restart">More Words</button>
                        <button class="button speak">Speak Please</button>
                      </div>
                    </div>`;
const ONE_CARD = `<div class="speak_card speak_card_active">
                  <div class='link_word_listen word_listen_active'></div>
                  <div class="word_look">
                    <p class="word"></p>
                    <p class="transcription"></p>
                  </div>
                </div>`;
const container = document.querySelector('.main');
const PRELOADING_TIME = 2000;
const MICROPHONE_TIME = 4000;
const QUANTITY_WORDS_IN_PAGE = 10;
const QUANTITY_ROUNDS_LEVELS = 6;
const CORRECT_MP3 = 'correct.mp3';
const MISS_MP3 = 'error.mp3';
const SPEAK_MODE = 'Speak Please';
const VIEW_MODE = 'View Translation';
const CORRECT_WORDS = 'Правильно произнесенные слова';
const UNCORRECT_WORDS = 'Неправильно произнесенные слова';
const IDS_TEXT = 'ID of this word: ';
const BACK = 'Назад';
const SVG_URL = '../src/assets/svg/speaker-for-final-modal.svg';
const ID_OF_WORD = 'id of this word is: ';
export {
  START_PAGE, PRELOADER, ONE_START, QUANTITY_MISS_RIGHT_ANWS, QUANTITY_STARS_NEXT_LEVEL,
  GAME_PAGE, ONE_CARD, container, PRELOADING_TIME, QUANTITY_WORDS_IN_PAGE,
  QUANTITY_ROUNDS_LEVELS, CORRECT_MP3, MISS_MP3, SPEAK_MODE, VIEW_MODE, CORRECT_WORDS,
  UNCORRECT_WORDS, IDS_TEXT, BACK, MICROPHONE_TIME, STATISTICS_MODAL_LAYOUT, SVG_URL, ID_OF_WORD,
};
