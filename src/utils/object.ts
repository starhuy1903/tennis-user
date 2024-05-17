import _ from 'lodash';

export function isEqual(obj1: any, obj2: any): boolean {
  return _.isEqual(obj1, obj2);
}
