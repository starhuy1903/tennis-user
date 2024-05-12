import CreatorGuardRoute from './CreatorGuardRoute';
import Feeds from './Feeds';
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
    // {
    //   path: 'tournaments',
    //   element: <GroupTournaments />,
    // },
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
