import getCorrectUrl from '../utils/getCorrectUrl';
import getRequestBody from '../utils/getRequestBody';
import { DEFAULT_USER_SETTINGS } from '../constants/constMainView';
import User from '../components/defaultUser/defaultUser';

export default class MainModel {
  constructor() {
    this.accessData = JSON.parse(localStorage.accessKey);
    this.userId = this.accessData.userId;
    this.token = this.accessData.token;
    this.currentUser = null;
  }

  async init() {
    if (this.accessData.username) {
      this.currentUser = new User(
        this.accessData.username,
        this.userId,
        this.token,
        DEFAULT_USER_SETTINGS,
      );
      await this.setUserSettings(
        this.currentUser.userId,
        this.currentUser.token,
        getRequestBody(this.currentUser),
      );
    }
  }

  getAccessData() {
    return this.accessData;
  }

  async updateUserSettings(user) {
    this.currentUser = user;
    await this.setUserSettings(user.userId, user.token, getRequestBody(user));
  }

  async getUser(userId, token) {
    if (this.accessData.username) {
      delete this.accessData.username;
      localStorage.accessKey = JSON.stringify(this.accessData);
      return this.currentUser;
    }
    const response = await this.getUserSettings(userId, token);
    this.currentUser = response;
    console.log('getUser', this.currentUser);
    return this.currentUser;
  }

  async setUserSettings(userId, token, settings) {
    this.rawResponse = await fetch(
      `https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`,
      {
        method: 'PUT',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      },
    );
    const content = await this.rawResponse.json();
    console.log('setUserSettings', content);
  }

  async getWords(currentPage, currentGroup, cardsTotal) {
    this.url = getCorrectUrl(currentPage, currentGroup, cardsTotal);
    const rawResponse = await fetch(this.url);
    const content = await rawResponse.json();
    return content;
  }

  async getUserSettings(userId, token) {
    this.rawResponse = await fetch(
      `https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`,
      {
        method: 'GET',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const content = await this.rawResponse.json();
    return JSON.parse(content.optional.user);
  }
}
