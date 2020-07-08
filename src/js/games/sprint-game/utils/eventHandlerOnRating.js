export default function addEventHandlerOnRating(array) {
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
    array.forEach((el) => el.classList.remove('gold_strong'));

    for (let i = 0; i <= star.id; i += 1) {
      array[i].classList.remove('star');
      array[i].classList.remove('gold');
      array[i].classList.add('gold_strong');
    }
  }));
}
