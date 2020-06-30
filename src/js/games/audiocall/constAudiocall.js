const audiocallGame = `
    <div class="container-game">
        <div class="container-game__trainings-audiocall" style="background-position-y: 100%;">
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
                              Есть 6 уровней сложности и 30 раундов. В каждом раунде по 20 слов.
                              Прослушай аудио на английском и укажи верный перевод к слову.
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
                        <div class="container-game__trainings-audiocall__answer" id="answer-1">
                            <span class="container-game__trainings-audiocall__number">1</span>
                        </div>
                        <div class="container-game__trainings-audiocall__answer" id="answer-2">
                            <span class="container-game__trainings-audiocall__number">2</span>
                        </div>
                        <div class="container-game__trainings-audiocall__answer" id="answer-3">
                            <span class="container-game__trainings-audiocall__number">3</span>
                        </div>
                        <div class="container-game__trainings-audiocall__answer" id="answer-4">
                            <span class="container-game__trainings-audiocall__number">4</span>
                        </div>
                    </div>
                    <a class="container-game__trainings-audiocall__answer-btn">
                        <span>Не знаю :(</span>
                    </a>
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

  export default audiocallGame;