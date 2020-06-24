
  
    const container = document.querySelector('.main');


    
 function g1() {
    addContent();
    controller = new Controller();
    model = new Model();
    view = new View();
    controller.addListeners();
}


    function addContent() {
        container.innerHTML = someHTML;
        const wordsContainer = document.querySelector('.words_container');
        for(var j = 0; j < 10; j++) {
            wordsContainer.innerHTML += oneCard;
        }
    }
// ------------------------------------speak recognition-----------------------------------
// window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// const recognition = new SpeechRecognition();
// recognition.interimResults = true;
// recognition.lang = 'en-US';
// recognition.maxAlternatives = 1;
// recognition.continuous = true;
// recognition.interimResults = false;
// // ----------------------------view----------------------------------
// class View {
//     constructor() {
//         this.image = document.querySelector('.image');
//         this.translation = document.querySelector('.translation');
//         this.input = document.querySelector('.inner');
//         this.inputContainer = document.querySelector('.inner_container');
//         this.container = document.querySelector('.words_container');
//         this.listens = Array.from(document.querySelectorAll('.word_listen'));
//         this.words = Array.from(document.querySelectorAll('.word'));
//         this.transcriptions = Array.from(document.querySelectorAll('.transcription'));
//         this.spinner = document.querySelector('.spiner');
//         this.textMean = document.querySelector('.text_mean');
//         this.textExplain = document.querySelector('.text_explain');
//         this.translateMean = document.querySelector('.translate_mean');
//         this.translateExplain = document.querySelector('.tarnslate_explain');
//         this.audios = [];
//         this.result = document.querySelector('.result');
//     }
//     showImage(url) {
//         view.image.style.backgroundImage = url
//     }

//     showTranslation(translate) {
//         view.translation.innerText = translate;
//     }

//     changeInput() {
//         this.input.value = '';
//         this.translation.classList.toggle('not_display');
//         this.inputContainer.classList.toggle('not_display');
//     }

//     checkInput() {
//         this.input.value = '';
//         if (model.recognitionMod){
//             this.translation.classList.toggle('not_display');
//             this.inputContainer.classList.toggle('not_display');
//             model.recognitionMod = false;
//         }
//     }

//     playSound(sound) {
//         if (this.audios.length > 0){
//             this.audios.forEach(el => el.muted = true);
//             this.audios = [];
//         }
//         let audio = new Audio(sound);
//         this.audios.push(audio)
//         audio.play();
//     }

//     viewWords(arrayWords, arrayTranscripts, arrayAudios) {
//         for(let i = 0 ; i < 10 ; i++){
//             this.words[i].innerText = arrayWords[model.arrayNumders[i]];
//             this.words[i].id = `${model.arrayNumders[i]}`;
//             this.transcriptions[i].innerText = arrayTranscripts[model.arrayNumders[i]];
//             let audioURL = model.createSoundURL(arrayAudios[model.arrayNumders[i]])
//             this.listens[i].id = audioURL;
//         }
//     }

//     recognition(record) {
//         this.input.value = record;
//     }

//     addDatasToPage(data) {
//         document.querySelector('.card').classList.add('choosen')
//         let imageURL = model.createURL(data.datasImages[0]);
//         this.showImage(imageURL);
//         this.showTranslation(data.datasWordTranslate[0]);
//         this.viewWords(data.datasWords, data.datasTranscription, data.datasAudios);
//     }

//     selectCard(card) {
//         let numerCardInArray;
//         if(card){
//             numerCardInArray = card.querySelector('.word').id;
//         }else{
//             numerCardInArray = model.arrayNumders[0];
//             controller.cards[0].classList.add('choosen');
//             this.showTranslation(model.datasWordTranslate[numerCardInArray]);
//             this.viewWords(model.datasWords, model.datasTranscription, model.datasAudios);
//         }
//         controller.groups.forEach(el => {
//             if (el.id == controller.startGroup){
//                 el.classList.add('choose')
//             }else{
//                 el.classList.remove('choose')
//             }
//         });

//         controller.rounds.forEach(el => {
//             if (el.id == controller.round){
//                 el.classList.add('choose')
//             }else{
//                 el.classList.remove('choose')
//             }
//         });


//         model.chooseWord = model.datasWords[numerCardInArray];
//         let imageURL = model.createURL(model.datasImages[numerCardInArray]);
//         this.showImage(imageURL);
//         this.showTranslation(model.datasWordTranslate[numerCardInArray]);
//         this.textMean.innerHTML = model.datasTextMeaning[numerCardInArray];
//         let speakURL = model.createSoundURL(model.datasAudioMeaning[numerCardInArray]);
//         this.textMean.id = speakURL;
//         this.textExplain.innerHTML = model.datasTextExample[numerCardInArray];
//         speakURL = model.createSoundURL(model.datasAudioExample[numerCardInArray]);
//         this.textExplain.id = speakURL;
//         this.translateMean.innerHTML = model.datasTextMeaningTranslate[numerCardInArray];
//         this.translateExplain.innerHTML = model.datasTextExampleTranslate[numerCardInArray];
//         controller.examples.forEach(example => example.addEventListener('click', () => view.playSound(example.id)));
//     }

//     changeResult() {
//         this.result.innerText ++;
//         if(this.result.innerText == NumberRightAnwserForNextLevel){
//             controller.round ++;
//             controller.onload();
//         }
//     }
// }
// // -------------------------------------model------------------------------------------
// class Model {
//     constructor() {
//         this.arrayNumders = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
//         this.datasWords = [];
//         this.datasImages = [];
//         this.datasAudios = [];
//         this.datasAudioMeaning = [];
//         this.datasAudioExample = [];
//         this.datasTextMeaning = [];
//         this.datasTextExample = [];
//         this.datasTranscription = [];
//         this.datasTextExampleTranslate = [];
//         this.datasTextMeaningTranslate = [];
//         this.datasWordTranslate = [];
//         this.recognitionMod = false;
//     }

//     createURL(link) {
//         return `url('https://raw.githubusercontent.com/vitali30/rslang-data/master/${link}')`
//      }

//     createSoundURL(link) {
//          return `https://raw.githubusercontent.com/vitali30/rslang-data/master/${link}`
//      }

//     getJson(group, page) {
//         return fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`)
//         .then(response => response.json())
//     }

//     shuffle(array) {
//         array.sort(() => Math.random() - 0.5);
//     }

//     extractAllDatas(json) {
//         this.shuffle(this.arrayNumders);
//         for (let i = 0 ; i < json.length ; i ++){
//             this.datasWords.push(json[i].word);
//             this.datasImages.push(json[i].image);
//             this.datasAudios.push(json[i].audio);
//             this.datasAudioMeaning.push(json[i].audioMeaning);
//             this.datasAudioExample.push(json[i].audioExample);
//             this.datasTextMeaning.push(json[i].textMeaning);
//             this.datasTextExample.push(json[i].textExample);
//             this.datasTranscription.push(json[i].transcription);
//             this.datasTextExampleTranslate.push(json[i].textExampleTranslate);
//             this.datasTextMeaningTranslate.push(json[i].textMeaningTranslate);
//             this.datasWordTranslate.push(json[i].wordTranslate);
//             this.chooseWord = '';
//         };
//     }

//     SpeechRecognition() {
//         this.recognitionMod = !this.recognitionMod;
//         if (this.recognitionMod){
//             recognition.start()
//         }else{
//             recognition.stop();
//             return false;
//         }
//     }

//     setRandomStartPage(round) {
//         let max = round * 5;
//         let min = max + 4;
//         return Math.floor(Math.random() * (max - min)) + min;
//     }

//     checkResult(checkingWord){
//         let arrExample = this.chooseWord.toUpperCase().split('');
//         let arrCheck = checkingWord.toUpperCase().split('');
//         let mis = 0;
//         for (let i=0 ; i < arrExample.length ; i++){
//             if (arrExample[i] != arrCheck[i]){
//                 mis++
//             }
//         }
//         if(mis <= NumberOfMisForCorrectAnwser){
//             view.changeResult()
//         }
//     }
// }

// // --------------------------------controller--------------------------------------
// class Controller {
//     constructor() {
//         this.startPage = 0;
//         this.startGroup = 0;
//         this.round = 0;
//         this.buttonRestart = document.querySelector('.restart');
//         this.buttonSpeak = document.querySelector('.speak');
//         this.buttonFinish = document.querySelector('.finish');
//         this.paginators = Array.from(document.querySelectorAll('span > a'));
//         this.cards = Array.from(document.querySelectorAll('.card'));
//         this.containerOver = document.querySelector('.container_over');
//         this.examples = Array.from(document.querySelectorAll('.examples'));
//         this.microphone = document.querySelector('.mic');
//         this.clear = document.querySelector('.clear');
//         this.groups = Array.from(document.querySelectorAll('.hard_level > p'));
//         this.rounds = Array.from(document.querySelectorAll('.page_level > p'));
//     }
//     addListeners() {
//         this.onload();
//         this.chooseCard();
//         this.rotateCard();
//         this.checkResultOfSpeak();
//         this.buttonRestart.onclick = () => this.onload();
//         this.buttonSpeak.onclick = () => view.changeInput();
//         view.listens.forEach(word => word.addEventListener('click', () => view.playSound(word.id)))
//         this.microphone.onclick = () => model.SpeechRecognition();
//         this.clear.onclick = () => view.input.value = '';
//         this.changeGroup();
//         this.changeRound();
//     }

//     changeGroup() {
//         this.groups.forEach(group => group.addEventListener('click', function() {
//             controller.startGroup = group.id;
//             controller.onload();
//         }))
//     }

//     changeRound() {
//         this.rounds.forEach(round => round.addEventListener('click', function() {
//             controller.round = round.id;
//             controller.onload();
//         }))
//     }

//     rotateCard() {
//         this.containerOver.onmouseover = function() {
//             this.querySelector('.card_over').classList.add('rotate');
//         }
//         this.containerOver.onmouseout = function() {
//             this.querySelector('.card_over').classList.remove('rotate')
//         };
//     }

//    async onload() {
//         controller.cards.forEach(card => card.classList.remove('choosen'));
//         this.startPage = model.setRandomStartPage(this.round);
//         model = new Model();
//         const gettingJson = await model.getJson(this.startGroup, this.startPage);
//         model.extractAllDatas(gettingJson);
//         view.selectCard();
//     }

//     chooseCard() {
//         this.cards.forEach(card => card.addEventListener('click', function(event) {
//             controller.cards.forEach(card => card.classList.remove('choosen'));
//             this.classList.add('choosen');
//             view.selectCard(this);
//             view.checkInput();
//         }));
//     }

//    chooseGroup() {
//     Pagination.page = +this.innerHTML;
//     Pagination.Start();
//     controller.startGroup = Pagination.page;
//     controller.onload();
//     }

//     checkResultOfSpeak() {
//         recognition.addEventListener('result', e => {
//             const result = Array.from(e.results).map(result => result[0]).map(result => result.transcript).join('')
//                 view.recognition(result);
//                 recognition.stop();
//                 model.checkResult(result);
//                 return false;
//         })
//     }
// }

