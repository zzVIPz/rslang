import Model from './js/models/indexModel';
import View from './js/views/indexView';
import Controller from './js/controllers/indexController';

window.onload = () => {
  const app = new Controller(Model, new View());
  app.init();
};
