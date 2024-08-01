import CreatorGuardRoute from './CreatorGuardRoute';
import Feeds from './Feeds';
import Finances from './Finances';
import GroupDetailsLayout from './GroupDetailsLayout';
import Member from './Member';
import UpdateGroupInformation from './UpdateGroupInformation';

export const groupDetailsRoutes = {
  path: ':groupId',
  element: <GroupDetailsLayout />,
  children: [
    {
      index: true,
      element: <Feeds />,
    },
    {
      path: 'feeds',
      element: <Feeds />,
    },
    {
      path: 'members',
      element: <Member />,
    },
    {
      path: 'finances',
      element: <Finances />,
    },
    {
      path: 'information',
      element: <CreatorGuardRoute />,
      children: [
        {
          index: true,
          element: <UpdateGroupInformation />,
        },
      ],
    },
  ],
};
