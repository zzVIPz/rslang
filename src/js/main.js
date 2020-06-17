import MainController from './controllers/mainController';
import AudiocallController from './games/audiocall/Controller';

window.onload = () => {
  const app = new MainController();
  app.init();
  const audiocall = new AudiocallController();
  audiocall.clickAudiocallBtn();
};
