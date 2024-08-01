import { BaseType } from './base';

export type UpdateNewsDto = {
  title?: string;
  image?: string;
  description?: string;
  content?: string;
  author?: string;
};

export type News = BaseType & UpdateNewsDto;
