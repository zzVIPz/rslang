export default class DictionaryController {
  constructor(mainModel) {
    this.mainModel = mainModel;
  }

  init() {
    console.log(`init daily stats: ${this.mainModel.currentUser}`);
  }
}
