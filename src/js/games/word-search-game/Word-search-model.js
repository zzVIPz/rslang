import randomInteger from '../utils/randomInteger';
// import randomArrAndShuffle from '../utils/shuffle';
import SavannahModel from '../savannah-game/Model';

class WordSearchModel extends SavannahModel {
  constructor() {
    super();
    this.us = '';
    this.matrix = Array(10).fill().map(() => Array(10).fill('#'));
    this.words = ['new zealand', 'wednesday', 'apocalypse', 'disneyland',
      'red', 'blue-ray', 'green', 'yellow', 'brown',
      'black', 'white', 'orange', 'grey', 'silver',
      'purple', 'gold', 'ice'];
    this.consonants = 'bcdfghjklmnpqrstvwxyz';
    this.vowels = 'aeiou';
  }

  getRandomLetter() {
    // 0 === false;
    // vowels === 33%
    if (randomInteger(0, 2)) {
      return this.consonants[randomInteger(0, this.consonants.length - 1)];
    }
    return this.vowels[randomInteger(0, this.vowels.length - 1)];
  }

  /* printMatrix(matrix);
console.log(getRandomLetter()); */

  moveCell = (r, c, maxRow, maxCol) => {
    let row = r;
    let col = c;
    // change row or column
    if (randomInteger(0, 1)) {
      // chose direction up or down
      row += [-1, 1][randomInteger(0, 1)];
      if (r === 0) {
        row = r + 1;
      }
      if (r === maxRow - 1) {
        row = r - 1;
      }
    } else {
      // left or right
      col += [-1, 1][randomInteger(0, 1)];
      if (c === 0) {
        col = c + 1;
      }

      if (c === maxCol - 1) {
        col = c - 1;
      }
    }

    return { row, col };
  }

  checkCell = (matrix, row, col, defaultPar = '#') => {
    if (matrix[row][col] !== defaultPar) {
      // not empty cell
      return false;
    }

    if (row + 1 < matrix.length && matrix[row + 1][col] === defaultPar) {
      return true;
    }

    if (col + 1 < matrix.length && matrix[row][col + 1] === defaultPar) {
      return true;
    }

    if (col - 1 >= 0 && matrix[row][col - 1] === defaultPar) {
      return true;
    }

    if (row - 1 >= 0 && matrix[row - 1][col] === defaultPar) {
      return true;
    }

    return false;
  }

  getFreeCells(matrix, numberOfLetterInWord) {
    let coords = [];
    let topTry = 0;
    let count = 0;

    while (count <= numberOfLetterInWord) {
      topTry += 1;

      if (topTry > 200) {
        coords = false;
        break;
      }

      coords = [];
      count = 0;
      const row = randomInteger(0, 9);
      const col = randomInteger(0, 9);

      if (this.checkCell(matrix, row, col)) {
        coords.push([row, col]);
        count += 1;

        const temp = this.cellVariants(row, col, count, numberOfLetterInWord, matrix, coords);
        coords = temp.coords;
        count = temp.count;
      }
    }

    return coords;
  }

  cellVariants(r, c, countWord, n, m, coordinates) {
    const matrix = m;
    const coords = coordinates;
    let count = countWord;
    let tryCount = 0;
    let newRow = r;
    let newCol = c;
    while (count <= n) {
      tryCount += 1;
      const newCoords = this.moveCell(newRow, newCol, matrix.length, matrix[0].length);

      if (this.checkCell(matrix, newCoords.row, newCoords.col)) {
        if (!this.checkArrayInArray(coords, [newCoords.row, newCoords.col])) {
          newRow = newCoords.row;
          newCol = newCoords.col;
          count += 1;
          coords.push([newRow, newCol]);
        }
      }

      if (tryCount > n * 16) {
        break;
      }
    }

    return { coords, count };
  }

  checkArrayInArray = (initialArray, ourArr) => {
    for (let i = 0; i < initialArray.length; i += 1) {
      if (initialArray[i][0] === ourArr[0] && initialArray[i][1] === ourArr[1]) {
        return true;
      }
    }

    return false;
  }

  fillMatrix = (matrix, wordsArr) => {
    // TODO to utils
    let newMatrix = matrix.map((arr) => arr.slice());
    const usedWords = [];

    wordsArr.map((word) => {
      const tmp = this.getFreeCells(newMatrix, word.length);

      if (tmp) {
        usedWords.push(word);

        (word.split('')).map((el, index) => {
          newMatrix[tmp[index][0]][tmp[index][1]] = el.toUpperCase();

          return true;
        });
      }

      return true;
    });

    newMatrix = this.fillEmptyCells(newMatrix);

    return { words: usedWords, matrix: newMatrix };
  }

  fillEmptyCells = (matrix, defaultPar = '#') => {
    const newMatrix = matrix.map((arr) => arr.slice());

    for (let i = 0; i < matrix.length; i += 1) {
      for (let j = 0; j < matrix[0].length; j += 1) {
        if (newMatrix[i][j] === defaultPar) {
          newMatrix[i][j] = this.getRandomLetter().toUpperCase();
        }
      }
    }

    return newMatrix;
  }

  getGameData() {
    const shortRandomArr = this.randomArrOfIndexes.splice(0, 10);
    this.tenEngWordsArr = [];
    this.tenTranslationsArray = [];
    this.tenAudioArray = [];
    this.tenWordsId = [];

    shortRandomArr.map((randInt) => {
      this.tenEngWordsArr.push(this.wordsArr[randInt]);
      this.tenTranslationsArray.push(this.translation[randInt]);
      this.tenAudioArray.push(this.audioArr[randInt]);
      this.tenWordsId.push(this.wordsIdArr[randInt]);

      return true;
    });
  }

  getObjectOfMatrixWord() {
    const matrixAndWords = this.fillMatrix(this.matrix, this.tenEngWordsArr);
    const { words, matrix } = matrixAndWords;
    console.log(words);

    return { matrix, words };
  }
}

export default WordSearchModel;
