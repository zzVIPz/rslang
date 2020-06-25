import { NumberRightAnwserForNextLevel, oneStar, container, soundURL } from './speak_it-constants';
import {View} from './speak_it-view';
import {Model} from './speak_it-model';
import {recognition} from './speak_it-recognition'
import { ModalWindow } from './speak_it-modal-window';

export class Controller {
    constructor(group, round) {
        this.startPage = 0;
        this.startGroup = group;
        this.startRound = round;
        this.buttonRestart = document.querySelector('.restart');
        this.buttonSpeak = document.querySelector('.speak');
        this.cards = Array.from(document.querySelectorAll('.card'));
        this.containerOver = document.querySelector('.container_over');
        this.examples = Array.from(document.querySelectorAll('.examples'));
        this.microphone = document.querySelector('.mic');
        this.clear = document.querySelector('.clear');
        this.groups = Array.from(document.querySelectorAll('.hard_level > p'));
        this.rounds = Array.from(document.querySelectorAll('.page_level > p'));
        this.model = new Model();
        this.view = new View();
        this.corectAns = 0;
        this.view.setStarsTop(this.startGroup, this.startRound);
        this.closeBtn = document.querySelector('.close');
        this.currentID ='';
        this.currentWord = '';
    }
    addListeners() {
        this.onload();
        this.chooseCard();
        this.rotateCard();
        this.getResultOfSpeak();
        this.buttonRestart.onclick = () => {
            this.model.reset();
            this.onload();
        };
        this.buttonSpeak.onclick = () => this.view.changeInput();
        this.view.listens.forEach(word => word.addEventListener('click', () => this.view.playSound(word.id)))
        this.microphone.onclick = () => this.model.SpeechRecognition();
        this.clear.onclick = () => this.view.input.innerText = '';
        this.closeStartPage();
    }
    async onload() {
        this.cards.forEach(card => card.classList.remove('choosen'));
        this.startPage = this.model.setRandomStartPage(this.startRound);
        const gettingJson = await this.model.getJson(this.startGroup, this.startPage);
        this.model.extractAllDatas(gettingJson);
        this.view.selectCard(false, this.model);
        this.model.chooseWord = this.model.datasWords[this.model.arrayNumders[0]];
        this.examples.forEach(example => example.addEventListener('click', () => this.view.playSound(example.id)));
        this.currentID = this.cards[0].id;
        this.currentWord = this.cards[0].querySelector('.word').innerText
    }
    chooseCard() {
        const newView = this.view;
        const newModel = this.model;
        const newController = this;
        this.cards.forEach(card => card.addEventListener('click', function() {
            if (newController.cards.includes(card)){
                newView.clearTranslation();
                newModel.chooseWord = newModel.datasWords[this.querySelector('.word').id];
                Array.from(document.querySelectorAll('.card')).forEach(card => card.classList.remove('choosen'));
                this.classList.add('choosen');
                newView.selectCard(this, newModel);
                newController.currentID = this.id
                newController.currentWord = this.querySelector('.word').innerText
            }
            
        }));
        
    }
    rotateCard() {
        this.containerOver.onmouseover = function() {
            this.querySelector('.card_over').classList.add('rotate');
        }
        this.containerOver.onmouseout = function() {
            this.querySelector('.card_over').classList.remove('rotate')
        };
    }
    getResultOfSpeak() {
        recognition.addEventListener('result', e => {
            const result = Array.from(e.results).map(result => result[0]).map(result => result.transcript).join('')
                this.view.recognition(result);
                recognition.stop();
                if(this.model.checkResult(result)) {
                    this.addToCorrectArray(this.currentID, this.currentWord);
                    this.view.result.innerHTML += oneStar;
                    this.addedRightAnwser();
                    this.playCorrectAnwser();
                    let correctelement = document.querySelector('.choosen');
                    for (let i = 0 ; i < this.cards.length ; i++) {
                        if (this.cards[i] === correctelement) {
                            delete this.cards[i];
                        }
                    }
                    this.cards
                }else{
                    this.addToWrongArray(this.currentID, this.currentWord);
                    this.playWrongAnwser();
                }
                return false;
        })
    }

    addToCorrectArray(id, word) {
        const obj = { 'word': word, 'id': id};
        if(this.isThereRepeat(this.model.correct, word)) {
            this.model.correct.push(obj)
        }
    }

    addToWrongArray(id, word) {
        const obj = { 'word': word, 'id': id};
        if(this.isThereRepeat(this.model.uncorrect, word)){
            this.model.uncorrect.push(obj);
        }
    }

    isThereRepeat(array, word) {
        for (let elem of array){
            if(elem.word === word){
                return false
            }
        };
        return true;
    }

    addedRightAnwser() {
        this.corectAns +=1;
        if(this.corectAns == NumberRightAnwserForNextLevel){
            this.startRound ++;
            this.corectAns = 0
            if(this.startRound == 6){
                this.startGroup ++;
                this.startRound = 0;
            }
            this.view.setStarsTop(this.startGroup, this.startRound);
            this.onload();
            this.view.result.innerHTML = '';
        }
    }

    closeStartPage() {
        this.closeBtn.onclick = () => {
            const modal = new ModalWindow(this.model.correct, this.model.uncorrect)
            modal.runListeners();
            modal.toggelModalWindov()
        }
    }
    playCorrectAnwser() {
        let audio = new Audio(soundURL + 'speak_it-clear.mp3')
        audio.play();
    }
    playWrongAnwser() {
        let audio = new Audio(soundURL + 'speak_it-error.mp3')
        audio.play();
    }
}