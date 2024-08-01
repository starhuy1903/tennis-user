import { BaseType } from './base';

export type News = BaseType & {
  title: string;
  image: string;
  description: string;
  content: string;
  author: string;
};

export type UpdateNewsDto = {
  title?: string;
  image?: string;
  description?: string;
  content?: string;
  author?: string;
};
