import SprintView from '../view/sprintView';
import SprintModel from '../model/sprintModel';

export default class SprintController {
  constructor() {
    this.view = new SprintView();
    this.model = new SprintModel();
  }

  init() {
    this.view.renderGameLayout();
  }
}
