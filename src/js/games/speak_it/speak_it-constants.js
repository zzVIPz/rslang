export const speakItStartPage = `
<div class="app">
    <div class="header_close">
      <a href="#" class="close"></a>
    </div>
    <div class="raiting_container">
      <div class="raiting_row rating_group ">
        <label class="group star" id="0">★</label>
        <label class="group star" id="1">★</label>
        <label class="group star" id="2">★</label>
        <label class="group star" id="3">★</label>
        <label class="group star" id="4">★</label>
        <label class="group star" id="5">★</label>
      </div>
      <div class="text">Уровень сложности</div>
    <div class="raiting_row rating_round">
      <label class="round star" id="0">★</label>
      <label class="round star" id="1">★</label>
      <label class="round star" id="2">★</label>
      <label class="round star" id="3">★</label>
      <label class="round star" id="4">★</label>
      <label class="round star" id="5">★</label>
    </div>
    <div class="text">Раунд</div>
  </div>

    <div class="app__content">
      <div class="app__content__title">Speak it simply</div>
      <div class="app__content__text">Потренируйся в произношении слов</div>
      <button class="app__button">Начать</button>
    </div>
    <div class="app__modal not_display">
      <div class="app__modal__box">
        <div class="app__modal__box_title">Тренировка не закончена!</div>
        <div class="app__modal__box_text">Если вы вернетесь к списку, ваши результаты не будут сохранены</div>
        <div class="app__button app__button_close">Закрыть</div>
        <div class="app__modal__box_cancel">Отмена</div>
      </div>
    </div>
  </div>`;

export const preloader = `
<div class="preloader__conatiner"> 
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

export const oneStar = ` <label class="group gold" id="0">★</label>`
export const NumberOfMisForCorrectAnwser = 1;
export const NumberRightAnwserForNextLevel = 10;
export const speakItGame = 
` 
<div class="header_close">
<a href="#" class="close"></a>
</div>

<div class="raiting_container">
<div class="raiting_row rating_group ">
  <label class="group star" id="0">★</label>
  <label class="group star" id="1">★</label>
  <label class="group star" id="2">★</label>
  <label class="group star" id="3">★</label>
  <label class="group star" id="4">★</label>
  <label class="group star" id="5">★</label>
</div>
<div class="text">Уровень сложности</div>
<div class="raiting_row rating_round">
<label class="round star" id="0">★</label>
<label class="round star" id="1">★</label>
<label class="round star" id="2">★</label>
<label class="round star" id="3">★</label>
<label class="round star" id="4">★</label>
<label class="round star" id="5">★</label>
</div>
<div class="text">Раунд</div>
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
      
    </div>

    <div class="words_container"></div>
    <div class="button_container">
    <button class="button restart">More Words</button>
    <button class="button speak">Speak Please</button>
   
</div>`;
export const oneCard = `<div class="card">
    <div class='word_listen'>
    </div>
    <div class="word_look">
    <p class="word"></p>
    <p class="transcription"></p>
    </div>
</div>`
export const container = document.querySelector('.main');
export const timeForPreloader = 3000;
export const fetchURL = 'https://afternoon-falls-25894.herokuapp.com/words?page=';
export const soundURL = 'https://raw.githubusercontent.com/vitali30/rslang-data/master/';
export const imageURL = `url('https://raw.githubusercontent.com/vitali30/rslang-data/master/`;

