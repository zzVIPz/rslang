import MainModel from '../models/mainModel';
import {WORDS_STATUS} from '../constants/constMainView'

export default async function checkUserWords(array) {
  const mainModel = new MainModel();
  const result = await mainModel.getAllUsersWords();
  for (const oneId of array) {
    for (let i = 0; i < result.length; i += 1) {
      if (oneId === result[i].wordId && result[i].difficulty === WORDS_STATUS.easy) {
        mainModel.updateUserWord(oneId, WORDS_STATUS.repeat);
      }
    }
  }
}
