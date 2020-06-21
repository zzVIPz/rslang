export function initionGamePage() {
    const someHTML = 
    `<div id="pagination"></div>
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
        <input type="text" class="inner not_display">
        <div class="words_container"></div>
        <div class="button_container">
        <button class="button restart">More Words</button>
        <button class="button speak">Speak Please</button>
        <button class="button finish">Finish</button>
    </div>`;
    const oneCard = `<div class="card">
        <div class='word_listen'>
            <audio class="listen"></audio>
        </div>
        <div class="word_look">
        <p class="word"></p>
        <p class="transcription"></p>
        </div>
    </div>`;
    const container = document.querySelector('.main');
    container.style.display = 'block';
    container.innerHTML += someHTML;
    const wordsContainer = document.querySelector('.words_container');
    for(var j = 0; j < 10; j++) {
      wordsContainer.innerHTML += oneCard;
    };
}