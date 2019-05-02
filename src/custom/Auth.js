import { apiFetch } from '../utils';

export default class Auth {
  constructor() {
    this.authenticated = null;
    this.profile = {};

    this.getProfile = this.getProfile.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  getProfile() {
    return this.profile;
  }

  async isAuthenticated() {
    console.log('what did you make of me', this.authenticated)
    // return new Date().getTime() < this.expiresAt; // make sure to set this prop
    if (this.authenticated == null /* or check experation */) {
      const result = await apiFetch('/auth/session');
      console.log('this is result', result);
      this.authenticated = Boolean(result.user);
    }
    return this.authenticated;
  }

  async login() {
    const result = await apiFetch('/auth/login');
    console.log('this is result', result);
  }

  logout() {
    return new Promise((resolve) => {
      // mocked for now, add real behavior later
      this.authenticated = false;
      resolve();
    });
  }
}
