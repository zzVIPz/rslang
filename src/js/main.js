// import Model from './js/models/indexModel';
// import View from './js/views/indexView';
import Controller from './controllers/mainController';

window.onload = () => {
  const app = new Controller();
  app.init();
};
