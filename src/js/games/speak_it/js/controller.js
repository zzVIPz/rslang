import {runSpeakItGame} from './speak_it';


export class Controller {
  constructor() {
    this.startPage = 0;
    this.startGroup = 0;
    this.buttonRestart = document.querySelector('.restart');
    this.buttonSpeak = document.querySelector('.speak');
    this.buttonFinish = document.querySelector('.finish');
    this.paginators = Array.from(document.querySelectorAll('span > a'));
    this.cards = Array.from(document.querySelectorAll('.card'));
    this.containerOver = document.querySelector('.container_over');
    this.examples = Array.from(document.querySelectorAll('.examples'));
    this.onload();
  }

  addListeners() {
    this.firstLoad();
    this.restartPage();
    this.chooseCard();
    this.speakMic();
    this.rotateCard();
  }

  addListenersPlayExamles() {
    this.playExample();
  }

  playExample() {
    this.examples.forEach(example => example.addEventListener('click', function() {
      view.playSound(this.id);
    }))
  }

  rotateCard() {
    this.containerOver.onmouseover = function() {
      this.querySelector('.card_over').classList.add('rotate');
    };
    this.containerOver.onmouseout = function() {
      this.querySelector('.card_over').classList.remove('rotate')
    };
  }

  async onload() {
    this.cards.forEach(card => card.classList.remove('choosen'));
    this.startPage = Math.floor(Math.random() * (29));

  }

  firstLoad() {
    ;
  }

  restartPage() {
    this.buttonRestart.onclick = () => this.onload();
  }

  chooseCard() {
    this.cards.forEach(card => card.addEventListener('click', function(event) {
      controller.cards.forEach(card => card.classList.remove('choosen'));
      this.classList.add('choosen');
      view.selectCard(this);
      view.checkInput();
    }));
  }

  speakMic() {
    this.buttonSpeak.onclick = () => {
      view.changeInput();
      model.SpeechRecognition();
    };
  }

  chooseGroup() {
    Pagination.page = +this.innerHTML;
    Pagination.Start();
    controller.startGroup = Pagination.page - 1;
    controller.onload();
  }
}