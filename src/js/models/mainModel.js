import getCorrectUrl from '../utils/getCorrectUrl';
import getUserSetting from '../utils/getUserSetting';
import { DEFAULT_USER } from '../constants/constMainView';

export default class MainModel {
  constructor() {
    this.accessData = JSON.parse(localStorage.accessKey);
    this.userId = this.accessData.userId;
    this.token = this.accessData.token;
    this.currentUser = DEFAULT_USER;
  }

  async init() {
    if (this.accessData.username) {
      this.currentUser.username = this.accessData.username;
      await this.setUserSettings(this.userId, getUserSetting(this.currentUser));
    }
  }

  getAccessData() {
    return this.accessData;
  }

  async updateUserSettings(userData) {
    this.currentUser = userData;
    await this.setUserSettings(this.userId, getUserSetting(userData));
  }

  async setUserSettings(userId, settings) {
    this.rawResponse = await fetch(
      `https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`,
      {
        method: 'PUT',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      },
    );
    const content = await this.rawResponse.json();
    console.log('setUserSettings', content);
  }

  async getWords(user) {
    this.url = getCorrectUrl(user.currentPage, user.currentGroup, user.cardsTotal);
    const rawResponse = await fetch(this.url);
    const content = await rawResponse.json();
    return content;
  }

  async getUserSettings(userId) {
    this.rawResponse = await fetch(
      `https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`,
      {
        method: 'GET',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const content = await this.rawResponse.json();
    return JSON.parse(content.optional.user);
  }

  async getUser() {
    if (this.accessData.username) {
      delete this.accessData.username;
      localStorage.accessKey = JSON.stringify(this.accessData);
      return this.currentUser;
    }
    const response = await this.getUserSettings(this.userId);
    this.currentUser = response;
    console.log('getUser', this.currentUser);
    return this.currentUser;
  }

  // eslint-disable-next-line class-methods-use-this
  getMedia(key) {
    return `https://raw.githubusercontent.com/zzvipz/rslang-data/master/${key}`;
  }
}
