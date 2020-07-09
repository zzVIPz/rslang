import randomInteger from '../utils/randomInteger';
import SavannahModel from '../savannah-game/Model';
import {
  UP,
  DOWN,
  LEFT,
  RIGHT,
  AMOUNT_OF_TRIES,
  MAX_POSSIBILITY,
  DEFAULT_EMPTY_CELL,
  CONSONANTS,
  VOWELS,
  SIZE_OF_MATRIX,
} from './constants';

class WordSearchModel extends SavannahModel {
  constructor() {
    super();
    this.matrix = Array(SIZE_OF_MATRIX)
      .fill()
      .map(() => Array(SIZE_OF_MATRIX).fill(DEFAULT_EMPTY_CELL));
    this.chosenWord = [];
    this.wordCoordinates = [];
  }

  setDefaultArray() {
    this.chosenWord = [];
    this.wordCoordinates = [];
  }

  getRandomLetter = () => {
    if (randomInteger(0, 2)) {
      return CONSONANTS[randomInteger(0, CONSONANTS.length - 1)];
    }

    return VOWELS[randomInteger(0, VOWELS.length - 1)];
  }

  moveCell = (r, c, maxRow, maxCol) => {
    let row = r;
    let col = c;

    if (randomInteger(0, 1)) {
      row += [UP, DOWN][randomInteger(0, 1)];

      if (r === 0) {
        row = r + 1;
      }

      if (r === maxRow - 1) {
        row = r - 1;
      }
    } else {
      col += [LEFT, RIGHT][randomInteger(0, 1)];

      if (c === 0) {
        col = c + 1;
      }

      if (c === maxCol - 1) {
        col = c - 1;
      }
    }

    return { row, col };
  }

  checkCell = (matrix, row, col, defaultPar = DEFAULT_EMPTY_CELL) => {
    if (matrix[row][col] !== defaultPar) {
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

    while (count < numberOfLetterInWord) {
      topTry += 1;

      if (topTry > AMOUNT_OF_TRIES) {
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

    while (count < n) {
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

      if (tryCount > n * MAX_POSSIBILITY) {
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
    let newMatrix = matrix.map((arr) => arr.slice());
    const usedWords = [];
    const arrWithCoordinates = [];

    wordsArr.map((word) => {
      const wordCoords = this.getFreeCells(newMatrix, word.length);

      if (wordCoords) {
        usedWords.push(word);
        arrWithCoordinates.push(wordCoords);

        (word.split('')).map((el, index) => {
          newMatrix[wordCoords[index][0]][wordCoords[index][1]] = el.toUpperCase();

          return true;
        });
      }

      return true;
    });

    newMatrix = this.fillEmptyCells(newMatrix);

    return { matrix: newMatrix, words: usedWords, coords: arrWithCoordinates };
  }

  fillEmptyCells = (matrix, defaultPar = DEFAULT_EMPTY_CELL) => {
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

    this.matrixObj = this.fillMatrix(this.matrix, this.tenEngWordsArr);

    if (this.matrixObj.words.length !== this.tenEngWordsArr.length) {
      const arrCopy = [...this.tenEngWordsArr];
      arrCopy.map((el) => {
        if (!this.matrixObj.words.includes(el)) {
          const id = this.tenEngWordsArr.indexOf(el);
          this.tenEngWordsArr.splice(id, 1);
          this.tenTranslationsArray.splice(id, 1);
          this.tenAudioArray.splice(id, 1);
          this.tenWordsId.splice(id, 1);
        }

        return true;
      });
    }
  }

  getChosenWordData(str) {
    const chosenWordIdInArr = this.tenEngWordsArr.indexOf(str);
    const chosenWordTranslation = this.tenTranslationsArray[chosenWordIdInArr];
    const chosenWordAudio = this.tenAudioArray[chosenWordIdInArr];

    return { chosenWordTranslation, chosenWordAudio };
  }
}

export default WordSearchModel;
