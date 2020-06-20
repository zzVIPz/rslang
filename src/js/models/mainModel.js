import { getUserSetting } from '../constants/constMainView';

export default class MainModel {
  constructor() {
    this.accessData = JSON.parse(localStorage.accessKey);
    this.currentUser = {
      username: null,
      cardsTotal: 10,
      cardsNew: 5,
      studyMode: 'mixed',
      learningWordsMode: 'mixed',
      transcription: true,
      associativePicture: true,
      btnKnow: true,
      btnDifficult: true,
    };
  }

  async init() {
    if (this.accessData.username) {
      this.currentUser.username = this.accessData.username;
      delete this.accessData.username;
      localStorage.accessKey = JSON.stringify(this.accessData);
      await this.setUserSettings(this.accessData.userId, getUserSetting(this.currentUser));
    }
  }

  getAccessData() {
    return this.accessData;
  }

  async updateUserSettings(userData) {
    this.currentUser = userData;
    await this.setUserSettings(this.accessData.userId, getUserSetting(userData));
  }

  async setUserSettings(userId, settings) {
    this.rawResponse = await fetch(
      `https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`,
      {
        method: 'PUT',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${this.accessData.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      },
    );
    const content = await this.rawResponse.json();
    console.log('setUserSettings', content);
  }

  async getUserSettings(userId) {
    this.rawResponse = await fetch(
      `https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`,
      {
        method: 'GET',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${this.accessData.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const content = await this.rawResponse.json();
    return JSON.parse(content.optional.user);
  }

  async getUser() {
    if (this.accessData.name) {
      return this.currentUser;
    }
    const response = await this.getUserSettings(this.accessData.userId);
    console.log('getUser', this.currentUser);
    this.currentUser = response;
    return this.currentUser;
  }

  // eslint-disable-next-line class-methods-use-this
  getMedia(key) {
    return `https://raw.githubusercontent.com/zzvipz/rslang-data/master/${key}`;
  }
}
