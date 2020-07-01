import getMediaUrl from '../../../utils/getMediaUrl';

export default class AudioModel {
  constructor(data) {
    this.data = data || null;
    this.audioArr = [];
    this.currentAudio = new Audio();
  }

  getAudioArray() {
    this.audioArr = [];
    this.data.forEach((el) => {
      const audioSrc = getMediaUrl(el.audioExample);
      this.audioArr.push(audioSrc);
    });
  }

  getCurrentAudio(currentSentence) {
    this.getAudioArray();
    this.currentAudio.src = this.audioArr[currentSentence];
    return this.currentAudio;
  }
}
