// export type GroupSliceType = {
//   groupId: string | null;
//   isAdmin: boolean;
// };
import { Group } from 'types/group';

export type GroupSliceType = {
  data: Group | null;
  // data.isCreator to check if user is creator of group
};
