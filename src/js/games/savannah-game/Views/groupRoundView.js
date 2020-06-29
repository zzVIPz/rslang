class GroupRoundView {
  constructor(html, main) {
    this.html = html;
    this.main = main;
  }

  init() {
    this.renderGroupRound();
    this.groups = Array.from(document.querySelectorAll('.group'));
    this.rounds = Array.from(document.querySelectorAll('.round'));
    this.addEventHandlerOnRating(this.groups);
    this.addEventHandlerOnRating(this.rounds);
  }

  renderGroupRound() {
    this.ratingContainer = document.querySelector('.rating__container');
    this.ratingContainer.innerHTML = this.html;
  }

  addEventHandlerOnRating(array) {
    array.forEach((star) => star.addEventListener('mouseover', () => {
      for (let i = 0; i <= star.id; i += 1) {
        array[i].classList.remove('star');
        array[i].classList.add('gold');
      }
    }));
    array.forEach((star) => star.addEventListener('mouseout', () => {
      array.forEach((el) => el.classList.remove('gold'));
      array.forEach((item) => item.classList.add('star'));
    }));

    array.forEach((star) => star.addEventListener('click', () => {
      if (star.classList.contains('group')) {
        this.choosenGroup = star.id;
      } else if (star.classList.contains('round')) {
        this.choosenPage = star.id;
      }

      array.forEach((el) => el.classList.remove('gold_strong'));

      for (let i = 0; i <= star.id; i += 1) {
        array[i].classList.remove('star');
        array[i].classList.remove('gold');
        array[i].classList.add('gold_strong');
      }
    }));
    return this;
  }
}
export default GroupRoundView;
