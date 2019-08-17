import { apiFetch } from './api';

export default class Auth {
  constructor() {
    this.authenticated = null;
    this.profile = {};

    this.getProfile = this.getProfile.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.logout = this.logout.bind(this);
  }

  getProfile() {
    return this.profile;
  }

  async isAuthenticated() {
    // return new Date().getTime() < this.expiresAt; // make sure to set this prop
    if (this.authenticated === null /* or check experation */) {
      try {
        const { profile } = await apiFetch('/auth/session');
        this.authenticated = Boolean(profile);
        if (profile) this.profile = profile;
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
      console.error('failed to logout', err.toString());
    }
  }

  saveProfile(user) {
    if (user) {
      console.log('this is user!', user);
      this.authenticated = true;
      this.profile = user.profile;
    }
  }
}
