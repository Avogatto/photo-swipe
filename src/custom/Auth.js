import { apiFetch } from '../utils';

export default class Auth {
  constructor() {
    this.authenticated = null;
    this.user = {};

    this.getUser = this.getUser.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.logout = this.logout.bind(this);
  }

  getUser() {
    return this.user;
  }

  async isAuthenticated() {
    // return new Date().getTime() < this.expiresAt; // make sure to set this prop
    if (this.authenticated === null /* or check experation */) {
      try {
        const result = await apiFetch('/auth/session');
        console.log('this is result', result);
        this.authenticated = Boolean(result.user);
      } catch (err) {
        console.error('failed to confirm authenticated', err);
      }
    }
    return this.authenticated;
  }

  async logout() {
    try {
      await apiFetch('/auth/logout');
      this.authenticated = false;
    } catch (err) {
      console.error('failed to logout', err);
    }
  }

  setUser(user) {
    if (user) {
      console.log('this is user!', user);

      this.authenticated = true;
      this.user = user;
    }
  }
}
