export const LOCAL_STORAGE_PREFIX = 'tennis';

export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';

export const ImageFileConfig = {
  MAX_SIZE: 2 * 1000 * 1000, // 2MB
  ACCEPTED_MINE_TYPES: {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
  },
};

export const LANGUAGES = [
  {
    value: 'EN',
    label: 'English',
  },
  {
    value: 'VN',
    label: 'Tiếng Việt',
  },
];

export enum Language {
  EN = 'EN',
  VN = 'VN',
}

export const LanguageOptions: {
  [key: Language | string]: string;
} = {
  [Language.EN]: 'English',
  [Language.VN]: 'Vietnamese',
};

export const APP_BACKGROUND_URL =
  'https://firebasestorage.googleapis.com/v0/b/tennis-7aa7c.appspot.com/o/app%2Ftennis.jpg?alt=media';

export enum SortBy {
  DESC = 'desc',
  ASC = 'asc',
}
