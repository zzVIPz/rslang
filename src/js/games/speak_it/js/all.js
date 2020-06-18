// ----------------------------------ADD ALL TO PAGE----------------------------

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
        <button class="button restart">Restart</button>
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
    </div>`
    const container = document.querySelector('.container');
    container.innerHTML += someHTML;
    const wordsContainer = document.querySelector('.words_container');
    
    for(var j = 0; j < 10; j++) {
        wordsContainer.innerHTML += oneCard;
    }
// -------------------------------------pagination------------------------
var Pagination = {
    code: '',
    size: 6,
    page: 1,
    step: 3,

    Init: function(e) {
        e.innerHTML = '<span></span>';
        Pagination.e = e.getElementsByTagName('span')[0];
        Pagination.Start();
    },
    
    Start: function() {
        Pagination.Add(1, Pagination.size + 1);
        Pagination.Finish();
    },

    Add: function(s, f) {
        for (var i = s; i < f; i++) {
            Pagination.code += '<a>' + i + '</a>';
        }
    },

    Finish: function() {
        Pagination.e.innerHTML = Pagination.code;
        Pagination.code = '';
        Pagination.Bind();
    },

    Bind: function() {
        var a = Pagination.e.getElementsByTagName('a');
        for (var i = 0; i < a.length; i++) {
            if (+a[i].innerHTML === Pagination.page) a[i].className = 'current';
            a[i].addEventListener('click', Pagination.Click, false);
        }
    },

    Click: function() {
        Pagination.page = +this.innerHTML;
        Pagination.Start();
        console.log(Pagination.page)
    },

};

var init = function() {
    Pagination.Init(document.getElementById('pagination'));
};

document.addEventListener('DOMContentLoaded', init, false);
// ------------------------------------speak recognition-----------------------------------
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';
recognition.maxAlternatives = 1;
recognition.continuous = true;
recognition.interimResults = false;
// --------------------------------------------speak input microphone------------------------------
class inputMic {
    constructor(index, object) {
        this.index = index;
        this.word = object.datasWords[index];
        this.audio = this.setAudioURL(object.datasAudios[index]);
        this.wordMean = object.datasTextMeaning[index];
        this.wordExplain = object.datasTextExample[index];
        this.translateMean = object.datasTextMeaningTranslate[index];
        this.tanslatyeExplain = object.datasTextExampleTranslate[index];
        this.audioMeaning = this.setAudioURL(object.datasAudioMeaning[index]);
        this.audioExample = this.setAudioURL(object.datasAudioExample[index]);
    }
    
    setAudioURL(link) {
        return `https://raw.githubusercontent.com/vitali30/rslang-data/master/${link}`;
    }
}

// ----------------------------view----------------------------------
const view = {
    image: document.querySelector('.image'),
    translation: document.querySelector('.translation'),
    input: document.querySelector('.inner'),
    container: document.querySelector('.words_container'),
    listens: Array.from(document.querySelectorAll('.listen')),
    words: Array.from(document.querySelectorAll('.word')),
    transcriptions: Array.from(document.querySelectorAll('.transcription')),
    spinner: document.querySelector('.spiner'),
    textMean: document.querySelector('.text_mean'),
    textExplain: document.querySelector('.text_explain'),
    translateMean: document.querySelector('.translate_mean'),
    translateExplain: document.querySelector('.tarnslate_explain'),
    audios: [],

    showImage(url) {
        view.image.style.backgroundImage = url
    },

    toggleSpinner() {
        this.spinner.classList.toggle('opacity');
    },
    showTranslation(translate) {
        view.translation.innerText = translate;
    },

    changeInput() {
        this.input.value = '';
        this.translation.classList.toggle('not_display');
        this.input.classList.toggle('not_display');
    },

    checkInput() {
        this.input.value = '';
        if (model.recognitionMod){
            view.translation.classList.toggle('not_display');
            view.input.classList.toggle('not_display');
            model.recognitionMod = false;
        }
    },

    playSound(sound) {
        if (this.audios.length > 0){
            this.audios.forEach(el => el.muted = true);
            this.audios = [];
        }
        let audio = new Audio(sound);
        this.audios.push(audio)
        audio.play();
        
    },

    viewWords(arrayWords, arrayTranscripts, arrayAudios) {
        for(let i = 0 ; i < 10 ; i++){
            this.words[i].innerText = arrayWords[i];
            this.words[i].id = `${i}`;
            this.transcriptions[i].innerText = arrayTranscripts[i];
            let audioURL = model.createSoundURL(arrayAudios[i])
            this.listens[i].src = audioURL;
        }
    },

    recognition(record) {
        this.input.value = record;
    },

    addDatasToPage(data) {
        document.querySelector('.card').classList.add('choosen')
        let imageURL = model.createURL(data.datasImages[0]);
        this.showImage(imageURL);
        this.showTranslation(data.datasWordTranslate[0]);
        this.viewWords(data.datasWords, data.datasTranscription, data.datasAudios);
    },

    selectCard(card) {
        let numerCardInArray;
        if(card){
            numerCardInArray = card.querySelector('.word').id;
            let audio = card.querySelector('.listen').src
        this.playSound(audio);
        }else{
            numerCardInArray = 0;
            controller.cards[numerCardInArray].classList.add('choosen');
            this.showTranslation(model.datasWordTranslate[numerCardInArray]);
            this.viewWords(model.datasWords, model.datasTranscription, model.datasAudios);
        }
        let imageURL = model.createURL(model.datasImages[numerCardInArray]);
        this.showImage(imageURL);
        this.showTranslation(model.datasWordTranslate[numerCardInArray]);
        this.textMean.innerHTML = model.datasTextMeaning[numerCardInArray];
        let speakURL = model.createSoundURL(model.datasAudioMeaning[numerCardInArray]);
        this.textMean.id = speakURL;
        this.textExplain.innerHTML = model.datasTextExample[numerCardInArray];
        speakURL = model.createSoundURL(model.datasAudioExample[numerCardInArray]);
        this.textExplain.id = speakURL;
        this.translateMean.innerHTML = model.datasTextMeaningTranslate[numerCardInArray];
        this.translateExplain.innerHTML = model.datasTextExampleTranslate[numerCardInArray];
        controller.addListenersPlayExamles();
    }
}


// -------------------------------------model------------------------------------------
const model = {
    group: 0,
    page: 0,
    isFirstTenWords: true,
    datasWords: [],
    datasImages: [],
    datasAudios: [],
    datasAudioMeaning: [],
    datasAudioExample: [],
    datasTextMeaning: [],
    datasTextExample: [],
    datasTranscription: [],
    datasTextExampleTranslate: [],
    datasTextMeaningTranslate: [],
    datasWordTranslate: [],
    recognitionMod: false,
    
    createURL(link) {
        return `url('https://raw.githubusercontent.com/vitali30/rslang-data/master/${link}')`
     },
     createSoundURL(link) {
         return `https://raw.githubusercontent.com/vitali30/rslang-data/master/${link}`
 
     },

    getJson(group, page) {
        return fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`)
        .then(response => response.json())
    },

    extractAllDatas(json) {
        for (let i = 0 ; i < json.length ; i ++){
            this.datasWords.push(json[i].word);
            this.datasImages.push(json[i].image);
            this.datasAudios.push(json[i].audio);
            this.datasAudioMeaning.push(json[i].audioMeaning);
            this.datasAudioExample.push(json[i].audioExample);
            this.datasTextMeaning.push(json[i].textMeaning);
            this.datasTextExample.push(json[i].textExample);
            this.datasTranscription.push(json[i].transcription);
            this.datasTextExampleTranslate.push(json[i].textExampleTranslate);
            this.datasTextMeaningTranslate.push(json[i].textMeaningTranslate);
            this.datasWordTranslate.push(json[i].wordTranslate);
        };
    },

    SpeechRecognition() {
        this.recognitionMod = !this.recognitionMod;
        if (this.recognitionMod){
            view.toggleSpinner();
            recognition.addEventListener('result', e => {
                const result = Array.from(e.results)
                        .map(result => result[0])
                        .map(result => result.transcript)
                        .join('')
                        view.recognition(result)
                        recognition.stop();
                        view.toggleSpinner();
            })
            recognition.start()
        }else{
            recognition.stop();
        }
    },
}

// --------------------------------controller--------------------------------------
const controller = {
    startPage: 0,
    startGroup: 0,
    buttonRestart: document.querySelector('.restart'),
    buttonSpeak: document.querySelector('.speak'),
    buttonFinish: document.querySelector('.finish'),
    paginators: Array.from(document.querySelectorAll('span > a')),
    cards: Array.from(document.querySelectorAll('.card')),
    containerOver: document.querySelector('.container_over'),
    examples: Array.from(document.querySelectorAll('.examples')),
    // cardOver: document.querySelector('.card_over'),

    addListeners() {
        this.onload();
        this.restartPage();
        this.chooseCard();
        this.speakMic();
        this.rotateCard();
       
   },

   addListenersPlayExamles() {
    this.playExample();
   },

   playExample() {
    this.examples.forEach(example => example.addEventListener('click', function() {
        view.playSound(this.id);
    }))
   },

   rotateCard() {
    this.containerOver.onmouseover = function() {
        this.querySelector('.card_over').classList.add('rotate');
    };

    this.containerOver.onmouseout = function() {
        this.querySelector('.card_over').classList.remove('rotate')
    };

   },

   onload() {
    window.onload = async () => {
        const gettingJson = await model.getJson(this.startGroup, this.startPage);
        model.extractAllDatas(gettingJson);
        view.selectCard();
    }
   },

   restartPage() {
    this.buttonRestart.onclick = () => {
        // this.onload()
    };
   },

    chooseCard() {
        this.cards.forEach(card => card.addEventListener('click', function(event) {
            controller.cards.forEach(card => card.classList.remove('choosen'));
            this.classList.add('choosen');
            view.selectCard(this);
            view.checkInput();
        }));
   },
  
   speakMic() {
    this.buttonSpeak.onclick = () => {
        view.changeInput();
        model.SpeechRecognition();
    };
   },
}

controller.addListeners()


//Use class for microphone input




// function checking(inputWord) {
//     console.log(inputWord);
//     let exampleword = example.innerText;
//     let checking = inputWord;

//     let arrExample = exampleword.split('')
//     let arr = checking.split('')
//     let mis = 0;

//     for (let i=0 ; i < arrExample.length ; i++){
//         if (arrExample[i] != arr[i]){
//             mis++
//         }
//     }

//     console.log('we get: ', mis, ' mistakes')
// }

// button.addEventListener('click', () => {
//     const word = inputing.innerText
//     checking(word)
// })
