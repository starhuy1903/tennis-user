import Fixtures from './Fixtures';
import OpenMatchDetails from './Fixtures/OpenMatchDetails';
import Fund from './Fund';
import Information from './Information';
import Matches from './Matches';
import Participants from './Participants';
import Standing from './Standing';
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
      path: 'matches',
      children: [
        {
          index: true,
          element: <Matches />,
        },
        {
          path: ':matchId',
          element: <OpenMatchDetails />,
        },
      ],
    },
    {
      path: 'standings',
      element: <Standing />,
    },
    {
      path: 'info',
      element: <Information />,
    },
    {
      path: 'fund',
      element: <Fund />,
    },
  ],
};
