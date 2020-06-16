import MainController from './controllers/mainController';
import Controller from './games/savannah-game/Controller';
import Model from './games/savannah-game/Model';

window.onload = () => {
  const app = new MainController();
  app.init();
  const savannah = new Controller(new Model());
  savannah.clickSavannahBtn();
};
