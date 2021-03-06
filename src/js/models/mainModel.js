import getCorrectUrl from '../utils/getCorrectUrl';
import { DEFAULT_USER_SETTINGS, DEFAULT_USER_STATISTIC } from '../constants/constMainView';
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

const getWordDescription = (category, optional) => ({
  difficulty: category,
  optional,
});

export default class MainModel {
  constructor() {
    this.accessData = JSON.parse(localStorage.accessKey);
    this.userId = this.accessData.userId;
    this.token = this.accessData.token;
    this.currentUser = null;
    this.onSetUserSettings = null;
  }

  async init() {
    if (this.accessData.username) {
      this.currentUser = new User(
        this.accessData.username,
        this.userId,
        this.token,
        DEFAULT_USER_SETTINGS,
      );
      await this.setUserSettings(getUserSettingsBodyRequest(this.currentUser));
      await this.setUserStatistic();
    }
  }

  getAccessData() {
    return this.accessData;
  }

  async updateUserSettings(user) {
    this.currentUser = user;
    await this.setUserSettings(getUserSettingsBodyRequest(user));
  }

  async getUser() {
    if (this.accessData.username) {
      delete this.accessData.username;
      localStorage.accessKey = JSON.stringify(this.accessData);
      return this.currentUser;
    }
    const response = await this.getUserSettings();
    this.currentUser = response;
    return this.currentUser;
  }

  setUserSettings = async (settings) => {
    await fetch(
      `${REQUEST_PARAMETERS.url}${this.userId}/settings`,
      getBodyRequest('PUT', this.token, settings),
    );

    if (this.onSetUserSettings) {
      this.onSetUserSettings(this.currentUser);
    }
  };

  getWords = async (currentPage = 0, currentGroup = 0, cardsTotal, wordsPerExample) => {
    const url = getCorrectUrl(currentPage, currentGroup, cardsTotal, wordsPerExample);
    const rawResponse = await fetch(url);
    const content = await rawResponse.json();
    return content;
  };

  getAllUsersWords = async () => {
    const rawResponse = await fetch(
      `${REQUEST_PARAMETERS.url}${this.userId}/words`,
      getBodyRequest('GET', this.token),
    );
    const content = await rawResponse.json();

    return content;
  };

  getUsersWordById = async (wordId) => {
    const rawResponse = await fetch(
      `${REQUEST_PARAMETERS.url}${this.userId}/words/${wordId}`,
      getBodyRequest('GET', this.token),
    );
    const content = await rawResponse.json();

    return content;
  };

  getAggregatedWords = async (filter, wordsPerPage) => {
    let url = `${REQUEST_PARAMETERS.url}${this.userId}/aggregatedWords?`;
    if (wordsPerPage) {
      url = `${url}wordsPerPage=${wordsPerPage}&`;
    }
    if (filter) {
      const formattedFilter = JSON.stringify(filter);
      url = `${url}filter=${encodeURIComponent(formattedFilter)}`;
    }
    const rawResponse = await fetch(url, getBodyRequest('GET', this.token));
    const content = await rawResponse.json();

    return content;
  };

  getAggregatedWordById = async (wordId) => {
    const rawResponse = await fetch(
      `${REQUEST_PARAMETERS.url}${this.userId}/aggregatedWords/${wordId}`,
      getBodyRequest('GET', this.token),
    );
    const content = await rawResponse.json();
    return content[0];
  };

  createUserWord = async (wordId, category, optional = {}) => {
    const description = getWordDescription(category, optional);
    await fetch(
      `${REQUEST_PARAMETERS.url}${this.userId}/words/${wordId}`,
      getBodyRequest('POST', this.token, description),
    );
  };

  updateUserWord = async (wordId, category, optional = {}) => {
    const description = getWordDescription(category, optional);
    await fetch(
      `${REQUEST_PARAMETERS.url}${this.userId}/words/${wordId}`,
      getBodyRequest('PUT', this.token, description),
    );
  };

  deleteUserWord = async (wordId) => {
    await fetch(
      `${REQUEST_PARAMETERS.url}${this.userId}/words/${wordId}`,
      getBodyRequest('DELETE', this.token),
    );
  };

  getUserSettings = async () => {
    const rawResponse = await fetch(
      `${REQUEST_PARAMETERS.url}${this.userId}/settings`,
      getBodyRequest('GET', this.token),
    );
    const content = await rawResponse.json();
    return JSON.parse(content.optional.user);
  };

  getUserStatistic = async () => {
    const rawResponse = await fetch(
      `${REQUEST_PARAMETERS.url}${this.userId}/statistics`,
      getBodyRequest('GET', this.token),
    );
    const currentStatistic = await rawResponse.json();
    return currentStatistic;
  };

  setUserStatistic = async (currentStatistic = DEFAULT_USER_STATISTIC) => {
    await fetch(
      `${REQUEST_PARAMETERS.url}${this.userId}/statistics`,
      getBodyRequest('PUT', this.token, currentStatistic),
    );
  };
}
