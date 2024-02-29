import { baseConfigs } from './base';

const configs = {
  apiUrl: 'http://localhost:8080',
  oauthClientID: '57473750552-tvjo39ammmn2phv18nfncdtj7kkansru.apps.googleusercontent.com',
  oauthClientSecret: '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',
};

export default Object.freeze({ ...baseConfigs, ...configs });
