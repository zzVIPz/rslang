import MainModel from '../models/mainModel';
import { WORDS_STATUS } from '../constants/constMainView';

export default async function checkUserWords(array) {
  const mainModel = new MainModel();
  const result = await mainModel.getAllUsersWords();
  for (let i = 0; i < array.length; i += 1) {
    for (let j = 0; j < result.length; j += 1) {
      if (array[i] === result[j].wordId) {
        switch (result[j].difficulty) {
          case WORDS_STATUS.easy:
            mainModel.updateUserWord(array[i], WORDS_STATUS.repeat);
            break;
          case WORDS_STATUS.repeat:
            mainModel.updateUserWord(array[i], WORDS_STATUS.difficult);
            break;
          default:
            break;
        }
      } else {
        mainModel.updateUserWord(array[i], WORDS_STATUS.repeat);
      }
    }
  }
}
