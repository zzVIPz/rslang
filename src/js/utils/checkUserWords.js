import MainModel from '../models/mainModel';
import { WORDS_STATUS } from '../constants/constMainView';

export default async function checkUserWords(array) {
  const mainModel = new MainModel();
  const result = await mainModel.getAllUsersWords();
  for (let i = 0; i < array; i += 1) {
    for (let j = 0; j < result.length; j += 1) {
      if (array[i] === result[j].wordId && result[j].difficulty === WORDS_STATUS.easy) {
        mainModel.updateUserWord(array[i], WORDS_STATUS.repeat);
      }
    }
  }
}