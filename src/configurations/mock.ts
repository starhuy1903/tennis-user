import { baseConfigs } from './base';

const configs = {
  apiUrl: 'http://localhost:8080/api',
};

export default Object.freeze({ ...baseConfigs, ...configs });
