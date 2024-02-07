import { LOCAL_STORAGE_PREFIX } from 'constants/app';

type StorageObject = Record<string, unknown>;

export class StorageUtils {
  constructor(private prefix: string) {
    this.prefix = prefix;
  }

  getStorageKey = (key: string) => `${this.prefix}.${key}`;

  getItem = (key: string): string | null => localStorage.getItem(this.getStorageKey(key));

  setItem = (key: string, value: string) => localStorage.setItem(this.getStorageKey(key), value);

  removeItem = (key: string) => localStorage.removeItem(this.getStorageKey(key));

  getJson = (key: string): StorageObject | string | null => {
    const value = this.getItem(key);

    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  };

  setJson = (key: string, value: StorageObject) => this.setItem(key, JSON.stringify(value));
}

export const storage = new StorageUtils(LOCAL_STORAGE_PREFIX);
