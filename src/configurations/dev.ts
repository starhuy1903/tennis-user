import { baseConfigs } from './base';

const configs = {
  // TODO: need to change
  apiUrl: 'http://localhost:8080',
};

export default Object.freeze({ ...baseConfigs, ...configs });
