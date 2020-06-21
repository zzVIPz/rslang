export function initionStartPage() {
    const preloader = `
<div class="preloader__conatiner"> 
    <div class="countdown">3</div>
    <div class="preloader">
      <div class="item-1"></div>
      <div class="item-2"></div>
      <div class="item-3"></div>
      <div class="item-4"></div>
      <div class="item-5"></div>
    </div>
    <div class="preloader__info">
      <img class="keyboard" src="../src/assets/images/keyboard.png">
      <span class="preloader__info_text">Используй клавиши 1, 2, 3 и 4, чтобы дать быстрый ответ</span>
    </div>
</div>`;

  
    const container = document.querySelector('.main');
    container.style.display = 'block';
    container.innerHTML = preloader;
    // const wordsContainer = document.querySelector('.words_container');
    // for(var j = 0; j < 10; j++) {
    //   wordsContainer.innerHTML += oneCard;
    // };
}