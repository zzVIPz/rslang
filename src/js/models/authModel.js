export default class AuthModel {
  async createUser(user) {
    this.rawResponse = await fetch('http://pacific-castle-12388.herokuapp.com/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    await this.rawResponse.json();
  }

  async loginUser(user, name) {
    this.rawResponse = await fetch('http://pacific-castle-12388.herokuapp.com/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const content = await this.rawResponse.json();
    if (content) {
      this.setDataToLocalStorage(content, name);
    }
  }

  setDataToLocalStorage(data, name) {
    this.formattedData = data;
    delete this.formattedData.message;
    if (name) {
      this.formattedData.username = name;
    }
    localStorage.accessKey = JSON.stringify(this.formattedData);
  }
}
