import { baseConfigs } from './base';

const configs = {
  apiUrl: 'http://localhost:8002',
};

export default Object.freeze({ ...baseConfigs, ...configs });
