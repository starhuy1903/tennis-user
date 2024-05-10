export enum MemberRole {
  GROUP_ADMIN = 'group_admin',
  MEMBER = 'member',
}

export const MemberRoleOptions = {
  [MemberRole.GROUP_ADMIN]: 'Group Admin',
  [MemberRole.MEMBER]: 'Member',
};

export const defaultGroupImage =
  'https://imageio.forbes.com/specials-images/imageserve/61290485e59b1a3c399d34e7/0x0.jpg?format=jpg&crop=2699,1519,x0,y0,safe&height=900&width=1600&fit=bounds';
