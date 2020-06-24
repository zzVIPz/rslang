import { NumberRightAnwserForNextLevel, oneStar, container } from './speak_it-constants';
import {View} from './speak_it-view';
import {Model} from './speak_it-model';
import {recognition} from './speak_it-recognition'

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
        this.cancelBtn = document.querySelector('.app__modal__box_cancel');
        this.backToMianBtn = document.querySelector('.app__button_close');
        this.appModal = document.querySelector('.app__modal');
        this.currentWord ='';
    }
    addListeners() {
        this.onload();
        this.chooseCard();
        this.rotateCard();
        this.getResultOfSpeak();
        this.buttonRestart.onclick = () => {
            this.model = new Model();
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
        this.currentWord = this.model.id[document.querySelector('.word').id];
        console.log('current word: ', this.currentWord);
    }
    chooseCard() {
        const newView = this.view;
        const newModel = this.model;
        const newController = this;
        this.cards.forEach(card => card.addEventListener('click', function() {
            newModel.chooseWord = newModel.datasWords[this.querySelector('.word').id];
            Array.from(document.querySelectorAll('.card')).forEach(card => card.classList.remove('choosen'));
            this.classList.add('choosen');
            newView.selectCard(this, newModel);
            newController.currentWord = newModel.id[newModel.arrayNumders[this.querySelector('.word').id]]
            console.log('current word: ', newController.currentWord);
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
                    this.model.correctId.push(this.currentWord.selector)
                    console.log('added to correct id: ', this.model.correctId)
                    this.view.result.innerHTML += oneStar;
                    this.addedRightAnwser()
                }else{
                    this.model.uncorrectId.push(this.currentWord.selector)
                    console.log('added to correct id: ', this.model.uncorrectId)
                }

                return false;
        })
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
            this.toggleModal()
            this.modalListeners();
        }
    }
    toggleModal() {
        this.appModal.classList.toggle('not_display')
    }
    modalListeners() {
        this.cancelBtn.onclick = () => this.toggleModal();
        this.backToMianBtn.onclick = () => {
            container.innerHTML = '';
            container.style.display = 'flex';
            document.body.classList.remove('app__background');
        }
    }
}