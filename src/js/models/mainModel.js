import getCorrectUrl from '../utils/getCorrectUrl';
import { DEFAULT_USER_SETTINGS } from '../constants/constMainView';
import User from '../components/defaultUser/defaultUser';

const REQUEST_PARAMETERS = {
  url: 'https://afternoon-falls-25894.herokuapp.com/users/',
};

const getBodyRequest = (method, token, settings) => {
  const bodyRequest = {
    method: `${method}`,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  if (settings) {
    bodyRequest.body = JSON.stringify(settings);
  }
  return bodyRequest;
};

const getUserSettingsBodyRequest = (userData) => ({
  wordsPerDay: userData.cardsTotal,
  optional: {
    user: JSON.stringify(userData),
  },
});

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
        getUserSettingsBodyRequest(this.currentUser),
      );
    }
  }

  getAccessData() {
    return this.accessData;
  }

  async updateUserSettings(user) {
    this.currentUser = user;
    await this.setUserSettings(user.userId, user.token, getUserSettingsBodyRequest(user));
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

  setUserSettings = async (userId, token, settings) => {
    const rawResponse = await fetch(
      `${REQUEST_PARAMETERS.url}${userId}/settings`,
      getBodyRequest('PUT', token, settings),
    );
    const content = await rawResponse.json();
    console.log('setUserSettings', content);
  };

  getWords = async (currentPage, currentGroup, cardsTotal, wordsPerExample) => {
    const url = getCorrectUrl(currentPage, currentGroup, cardsTotal, wordsPerExample);
    const rawResponse = await fetch(url);
    const content = await rawResponse.json();
    return content;
  };

  getAllUsersWords = async (userId, token) => {
    const rawResponse = await fetch(
      `${REQUEST_PARAMETERS.url}${userId}/words`,
      getBodyRequest('GET', token),
    );
    const content = await rawResponse.json();

    console.log('getAllUsersWords', content);
    return content;
  };

  getAggregatedWords = async (userId, token, filter) => {
    let url = `${REQUEST_PARAMETERS.url}${userId}/aggregatedWords`;
    if (filter) {
      const formattedFilter = `${filter}`;
      url = `${REQUEST_PARAMETERS.url}${userId}/aggregatedWords?${encodeURIComponent(
        formattedFilter,
      )}`;
    }
    const rawResponse = await fetch(url, getBodyRequest('GET', token));
    const content = await rawResponse.json();

    console.log('getAllUsersWords', content);
    return content;
  };

  getAggregatedWordById = async (userId, token, wordId) => {
    const rawResponse = await fetch(
      `${REQUEST_PARAMETERS.url}${userId}/aggregatedWords/${wordId}`,
      getBodyRequest('GET', token),
    );
    const content = await rawResponse.json();

    console.log('getAggregatedWordById', content);
    return content[0];
  };

  createUserWord = async (userId, token, wordId, word) => {
    const rawResponse = await fetch(
      `${REQUEST_PARAMETERS.url}${userId}/words/${wordId}`,
      getBodyRequest('POST', token, word),
    );
    const content = await rawResponse.json();

    console.log(content);
  };

  getUserSettings = async (userId, token) => {
    const rawResponse = await fetch(
      `${REQUEST_PARAMETERS.url}${userId}/settings`,
      getBodyRequest('GET', token),
    );
    const content = await rawResponse.json();
    return JSON.parse(content.optional.user);
  };
}
