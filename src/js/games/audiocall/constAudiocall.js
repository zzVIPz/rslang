const audiocallGame = `
    <div class="container-game">
        <div class="container-game__trainings-audiocall">
            <div class="container-game__trainings-audiocall__close"></div>
            <div class="container-game__levels-container">
                <div class="app__rating">
                    <div class="rating">
                        <div>
                            <input class="rating__input" type="radio" id="star6" name="star"/>
                            <label class="rating__label" for="star6" title="level-6" data-level="5"></label>
                        </div>
                        <div>
                            <input class="rating__input" type="radio" id="star5" name="star"/>
                            <label class="rating__label" for="star5" title="level-5" data-level="4"></label>
                        </div>
                        <div>
                            <input class="rating__input" type="radio" id="star4" name="star"/>
                            <label class="rating__label" for="star4" title="level-4" data-level="3"></label>
                        </div>
                        <div>
                            <input class="rating__input" type="radio" id="star3" name="star"/>
                            <label class="rating__label" for="star3" title="level-3" data-level="2"></label>
                        </div>
                        <div>
                            <input class="rating__input" type="radio" id="star2" name="star"/>
                            <label class="rating__label" for="star2" title="level-2" data-level="1"></label>
                        </div>
                        <div>
                            <input class="rating__input" type="radio" id="star1" name="star"/>
                            <label class="rating__label" for="star1" title="level-1" data-level="0"></label>
                        </div>
                    </div>
                    <div class="rating__text">
                        <span>Уровень сложности</span>
                    </div>
                </div>
            </div>
            <div class="container-game__round-container">
                <div class="app__rating">
                    <div class="rating-round">
                        <div>
                            <input class="rating__input" type="radio" id="star6" name="star"/>
                            <label class="rating__label" for="star6" title="round-6" data-round="5"></label>
                        </div>
                        <div>
                            <input class="rating__input" type="radio" id="star5" name="star"/>
                            <label class="rating__label" for="star5" title="round-5" data-round="4"></label>
                        </div>
                        <div>
                            <input class="rating__input" type="radio" id="star4" name="star"/>
                            <label class="rating__label" for="star4" title="round-4" data-round="3"></label>
                        </div>
                        <div>
                            <input class="rating__input" type="radio" id="star3" name="star"/>
                            <label class="rating__label" for="star3" title="round-3" data-round="2"></label>
                        </div>
                        <div>
                            <input class="rating__input" type="radio" id="star2" name="star"/>
                            <label class="rating__label" for="star2" title="round-2" data-round="1"></label>
                        </div>
                        <div>
                            <input class="rating__input" type="radio" id="star1" name="star"/>
                            <label class="rating__label" for="star1" title="round-1" data-round="0"></label>
                        </div>
                        </div>
                        <div class="rating__text">
                            <span>Раунд</span>
                        </div>
                    </div>
                </div>
                <div class="container-game__trainings-audiocall__intro">
                    <div class="container-game__trainings-audiocall__intro-title">
                        <span>Аудиовызов</span>
                    </div>
                    <div class="container-game__trainings-audiocall__intro-text">
                        <span>Тренировка Аудиовызов улучшает восприятие английской речи на слух.
                              Есть 6 уровней сложности и 30 раундов. 
                        </span>
                    </div>
                    <a class="container-game__trainings-audiocall__intro-btn">
                        <span>Начать</span>
                    </a>
                </div>
            </div>
            <div class="container-game__preload">
                <div class="wrapp-flex">
                    <div class="loader"></div>
                    <div class="container-game__preload__text">
                        <span>Для выбора варианта ответа можно воспользоваться 
                            мышкой или клавишами 1, 2, 3, 4 на клавиатуре
                        </span>
                    </div>
                </div>
            </div>
            <div class="container-game__trainings-audiocall__answers">
                <div class="container-game__trainings-audiocall__answers__header">
                    <img class ="container-game__trainings-audiocall__answers__header__image">
                    <div class="position-center">
                        <div class="container-game__trainings-audiocall__speaker-container">
                            <div class="container-game__trainings-audiocall__circle small-circle"></div>
                            <i class="container-game__trainings-audiocall__sound-btn"></i>
                            <div class="container-game__trainings-audiocall__circle big-circle"></div>
                        </div>
                        <div class="container-game__trainings-audiocall__answers__header__word"></div>
                    </div>
                </div>
                    <div id="choosen-answer">
                        <div class="container-game__trainings-audiocall__answer unclickable" id="answer-1">
                            <span class="container-game__trainings-audiocall__number">1</span>
                        </div>
                        <div class="container-game__trainings-audiocall__answer unclickable" id="answer-2">
                            <span class="container-game__trainings-audiocall__number">2</span>
                        </div>
                        <div class="container-game__trainings-audiocall__answer unclickable" id="answer-3">
                            <span class="container-game__trainings-audiocall__number">3</span>
                        </div>
                        <div class="container-game__trainings-audiocall__answer unclickable" id="answer-4">
                            <span class="container-game__trainings-audiocall__number">4</span>
                        </div>
                    </div>
                    <a class="container-game__trainings-audiocall__answer-btn">
                        <span>Не знаю :(</span>
                    </a>
                </div>
                <div class="container-game__final">
                    <div class="container-game__final__title">
                        <span></span>
                    </div>
                    <div class="container-game__final__slider">
                        <div class="container-game__final__slider-answers">
                            <div class="container-game__final__slider-answers__invalid">
                                <div class="container-game__final__slider-answers__invalid__title">
                                    <span>ОШИБОК:</span>
                                </div>
                            </div>
                            <div class="container-game__final__slider-answers__line"></div>
                            <div class="container-game__final__slider-answers__valid">
                                <div class="container-game__final__slider-answers__valid__title">
                                    <span>ЗНАЮ:</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container-game__final__continue">
                        <span>Продолжить тренировку</span>
                    </div>
                    <div class="container-game__final__back">
                        <span>К списку тренировок</span>
                    </div>
                </div>
                <div class="container-game__modal">
                    <div class="container-game__modal__header"></div>
                    <div class="container-game__modal__body">
                        <div class="container-game__modal__close-body"></div>
                        <div class="container-game__crossword-modal__cont">
                            <div class="container-game__crossword-modal__title">
                                <span>Тренировка не закончена!</span>
                            </div>
                            <div class="container-game__crossword-modal__text">
                                <span>Если вы вернетесь к списку, ваши результаты не будут сохранены</span>
                            </div>
                            <div class="container-game__crossword-modal__btn-close">
                                <span>Закрыть</span>
                            </div>
                            <div class="container-game__crossword-modal__cancel">
                                <span>Отмена</span>
                            </div>
                        </div>
                    </div>
                    <div class="container-game__modal__footer"></div>
                </div>
            </div>
        </div>`;

const DELAY = 1000;
const DELAY_BEFORE_GAME_START = 5500;
const DELAY_BEFORE_SHOW_WORDS = 2000;
const DELAY_BEFORE_SHOW_IMAGE_WORD = 100;
const REMOVE_ANIMATION_SPEAKER = 2000;
const AUDIOCALL_HASH_REGEXP = /#audiocall/;
const NEXT = 'Далее';
const I_DO_NOT_KNOW = 'Не знаю :(';
const FAIL = 'В этот раз не получилось, но продолжай тренироваться!';
const WIN = 'Так держать! Испытай себя на следующем раунде или уровне.';
const EMPTY_ARRAY = ['пробовать', 'смешивать', 'пахать'];

export {
  audiocallGame, DELAY_BEFORE_GAME_START,
  NEXT, I_DO_NOT_KNOW, FAIL, WIN, REMOVE_ANIMATION_SPEAKER,
  EMPTY_ARRAY, AUDIOCALL_HASH_REGEXP, DELAY_BEFORE_SHOW_WORDS,
  DELAY_BEFORE_SHOW_IMAGE_WORD, DELAY,
};
