import { container } from './speak_it-constants';

export class StartingClass {
    constructor() {
        this.choosenGroup = 0;
        this.choosenPage = 0;
        this.closeBtn = document.querySelector('.close');
        this.groups = Array.from(document.querySelectorAll('.group'));
        this.rounds = Array.from(document.querySelectorAll('.round'));
        this.startBtn = document.querySelector('.app__button');
        this.appModal = document.querySelector('.app__modal');
        this.cancelBtn = document.querySelector('.app__modal__box_cancel');
        this.backToMianBtn = document.querySelector('.app__button_close');
    }
    addListeners() {
        this.hoverGroupStars(this.groups);
        this.hoverGroupStars(this.rounds);
        this.closeStartPage();
    }
    hoverGroupStars(array) {
        array.forEach(star => star.addEventListener('mouseover', () => {
            for(let i=0 ; i <= star.id ; i++){
                array[i].classList.remove('star');
                array[i].classList.add('gold');
            }
        }))
        array.forEach(star => star.addEventListener('mouseout', () => {
            array.forEach(star => star.classList.remove('gold'));
            array.forEach(star => star.classList.add('star'));
        }))
        array.forEach(star => star.addEventListener('click', () => {
            if(star.classList.contains('group')){
                this.choosenGroup = star.id;
            }
            else if(star.classList.contains('round')){
                this.choosenPage = star.id;
            }
            array.forEach(star => star.classList.remove('gold_strong'));
            for(let i=0 ; i <= star.id ; i++){
                array[i].classList.remove('star');
                array[i].classList.remove('gold');
                array[i].classList.add('gold_strong');
            }
        }))
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