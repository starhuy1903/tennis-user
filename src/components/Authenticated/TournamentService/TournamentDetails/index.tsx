import Fixtures from './Fixtures';
import OpenMatchDetails from './Fixtures/OpenMatchDetails';
import Information from './Information';
import Participants from './Participants';
import TournamentDetailsLayout from './TournamentDetailsLayout';

export const tournamentDetailsRoutes = {
  path: ':tournamentId',
  element: <TournamentDetailsLayout />,
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
      element: <OpenMatchDetails />,
    },
  ],
};
