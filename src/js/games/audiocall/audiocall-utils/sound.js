export default function sound(url, sound) {
    if (sound) {
        new Audio(url + sound).play();
    } else {
        new Audio(url).play();
    }
  }