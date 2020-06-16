import MainController from './controllers/mainController';
import SavannahController from './games/savannah-game/Controller';

window.onload = () => {
  const app = new MainController();
  app.init();
  const savannah = new SavannahController();
  savannah.clickSavannahBtn();
};
