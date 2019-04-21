export default class Auth {
  constructor() {
    this.authenticated = false;
    this.profile = {};

    this.getProfile = this.getProfile.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  getProfile() {
    return this.profile;
  }

  isAuthenticated() {
    // return new Date().getTime() < this.expiresAt; // make sure to set this prop
    return this.authenticated;
  }

  login() {
    return new Promise((resolve) => {
      // mocked for now, add real behavior later
      this.authenticated = true;
      resolve();
    });
  }

  logout() {
    return new Promise((resolve) => {
      // mocked for now, add real behavior later
      this.authenticated = false;
      resolve();
    });
  }
}
