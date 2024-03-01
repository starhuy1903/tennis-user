import { BaseType } from './base';

export type News = BaseType & {
  title: string;
  description: string;
  image: string;
};
