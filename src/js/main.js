import MainController from './controllers/mainController';

window.onload = () => {
  const app = new MainController();
  app.init();
};
