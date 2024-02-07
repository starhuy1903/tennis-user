import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/app';
import { storage } from './storage';

export class AuthUtils {
  private accessToken: string;
  private refreshToken: string;
  private logoutCallbacks: (() => void)[] = [];

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  setToken(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    storage.setItem(ACCESS_TOKEN, accessToken);
    storage.setItem(REFRESH_TOKEN, refreshToken);
  }

  getAccessToken(): string {
    return this.accessToken;
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }

  getAuthenticated = () => !!this.accessToken;

  logout = () => {
    this.setToken('', '');
    this.logoutCallbacks.forEach((callback) => callback());
  };

  addLogoutCallback = (callback: () => void) => {
    this.logoutCallbacks.push(callback);
  };

  removeLogoutCallback = (callback: () => void) => {
    this.logoutCallbacks = this.logoutCallbacks.filter((cb) => cb !== callback);
  };
}

const accessToken = storage.getItem(ACCESS_TOKEN);
const refreshToken = storage.getItem(REFRESH_TOKEN);

const credentials = {
  accessToken: accessToken || '',
  refreshToken: refreshToken || '',
};

const auth = new AuthUtils(credentials.accessToken, credentials.refreshToken);

export default auth;
