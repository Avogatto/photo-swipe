import { makeRequest } from './api';

export default class Auth {
  constructor() {
    this.authenticated = null;
    this.getRouteProps = () => {
      throw new Error('Auth is not initialized');
    };
    this.profile = {};

    this.initialize = this.initialize.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async initialize(getRouteProps) {
    this.getRouteProps = getRouteProps;
    try {
      const { profile } = await makeRequest('/auth/session');
      this.authenticated = Boolean(profile);
      if (profile) this.profile = profile;
    } catch (err) {
      console.error('failed to confirm authenticated', err);
    }
  }
  getProfile() {
    return this.profile;
  }

  isAuthenticated() {
    return this.authenticated;
  }

  login(user) {
    const { history, location } = this.getRouteProps();
    const { from } = location.state || { from: { pathname: '/' } };
    if (user) {
      this.authenticated = true;
      this.profile = user.profile;
    }
    history.push(from);
  }

  async logout() {
    const { history } = this.getRouteProps();
    try {
      await makeRequest('/auth/logout');
      this.authenticated = false;
      history.push('/login');
    } catch (err) {
      console.error('failed to logout', err.toString());
    }
  }
}
