import { baseConfigs } from './base';

const configs = {
  apiUrl: 'http://localhost:8200/api',
};

export default Object.freeze({ ...baseConfigs, ...configs });
