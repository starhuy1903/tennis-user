import Fixtures from './Fixtures';
import GroupMatchDetails from './Fixtures/GroupMatchDetails';
import GroupTournamentDetailsLayout from './GroupTournamentDetailsLayout';
import Information from './Information';
import Participants from './Participants';

export const groupTournamentDetailsRoutes = {
  path: ':tournamentId',
  element: <GroupTournamentDetailsLayout />,
  children: [
    {
      index: true,
      element: <Information />,
    },
    {
      path: 'participants',
      element: <Participants />,
    },
    {
      path: 'fixtures',
      element: <Fixtures />,
    },
    {
      path: 'info',
      element: <Information />,
    },
    {
      path: 'matches/:matchId',
      element: <GroupMatchDetails />,
    },
  ],
};
