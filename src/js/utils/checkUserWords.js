import MainModel from '../models/mainModel'

export default async function checkUserWords(array) { 
    let mainModel = new MainModel();
    const result = await mainModel.getAllUsersWords();
  for (let oneId of array) {
      for (let i = 0 ; i < result.length ; i += 1) {
          if (oneId === result[i].wordId && result[i].difficulty === "easy") {
              mainModel.updateUserWord(oneId, 'repeat')
          }
      }
  }
}