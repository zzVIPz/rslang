import { NumberRightAnwserForNextLevel, oneStar, container } from './speak_it-constants';


export class ModalWindow {
    constructor(correct, uncorrect) {
        this.cancelBtn = document.querySelector('.modal_cancel');
        this.backToMianBtn = document.querySelector('.modal_close');
        this.viewStatistic = document.querySelector('.modal_view');
        this.appModal = document.querySelector('.modal_container');
        this.statisticModalWindow = document.querySelector('.modal_statistic');
        this.correctWordsArray = correct;
        this.uncorrectWordsArray = uncorrect;
    }

    runListeners() {
        this.returnToGame();
        this.stopGame();
        this.viewStatisticMethod();
 

    }

    stopGame() {
        this.backToMianBtn.onclick = () => {
            container.innerHTML = '';
            container.style.display = 'flex';
            container.classList.add('app__background');
        }
    }

    returnToGame() {
        this.cancelBtn.onclick = () => this.toggelModalWindov();
    }

    toggelModalWindov() {
        this.appModal.classList.toggle('not_display')
    }

    viewStatisticMethod() {
    
        this.viewStatistic.onclick = () => {
            this.statisticModalWindow.classList.toggle('not_display');
            this.addStatisticToPage();
            // let gameHTML = container.innerHTML;
            // container.innerHTML = '';
            
            this.statisticModalWindow.innerHTML += `<button class="button close_statistic">Вернуться</button>`;
            this.closeStatistic();
            
        }
  
    }

    
    addStatisticToPage() {
        this.statisticModalWindow.innerHTML = `
            <h2>Правильно произнесенные слова</h2>
        `
        for(let word of this.correctWordsArray) {
            this.statisticModalWindow.innerHTML += `<p>${word.word} - ${word.id}</p>`
        }
        this.statisticModalWindow.innerHTML += `
        <h2>Неправильно произнесенные слова</h2>
        `
        for(let word of this.uncorrectWordsArray) {
            this.statisticModalWindow.innerHTML += `<p>${word.word} - ${word.id}</p>`
        }

    }



    closeStatistic() {
        document.querySelector('.close_statistic').onclick = () => {
            this.statisticModalWindow.classList.toggle('not_display');

        }
    }

   



}