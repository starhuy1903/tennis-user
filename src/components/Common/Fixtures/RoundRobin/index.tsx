import { Box, Container, Stack } from '@mui/material';
import produce from 'immer';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import { ModalKey } from 'constants/modal';
import { useGetTeamQuery } from 'store/api/tournament/creator/fixture';
import { useGetRefereesQuery } from 'store/api/tournament/creator/participant';
import { showModal } from 'store/slice/modalSlice';
import { selectTournamentData } from 'store/slice/tournamentSlice';
import { EditMatchPayload } from 'types/match';
import { Match, Round, Team, TournamentFixture } from 'types/tournament-fixtures';
import { checkGeneratedFixture } from 'utils/tournament';

import NoData from '../../NoData';
import { MatchItem } from './MatchItem';

type RoundRobinFixtureProps = {
  rounds?: Round[];
  setFixtureData?: React.Dispatch<React.SetStateAction<TournamentFixture | null>>;
};

export default function RoundRobinFixture({ rounds, setFixtureData }: RoundRobinFixtureProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tournamentData = useAppSelector(selectTournamentData);

  const { data: teamData, isLoading: fetchingTeamData } = useGetTeamQuery(tournamentData.id, {
    refetchOnMountOrArgChange: true,
  });

  const { data: referees, isLoading: fetchingRefereeData } = useGetRefereesQuery(tournamentData.id);

  const handleUpdateFixture = useCallback(
    (match: EditMatchPayload) => {
      setFixtureData?.((prev) => {
        if (prev) {
          const updatedGroups = produce(prev.roundRobinGroups, (draftGroups) => {
            draftGroups?.[0].rounds.forEach((round) => {
              round.matches.forEach((m) => {
                if (m.id === match.id) {
                  m.title = match.name;
                  m.matchStartDate = match.dateTime;
                  m.duration = match.duration;
                  m.refereeId = match.refereeId;
                  m.teams.team1 = teamData?.data.find((team) => team.id === match.team1Id) as Team;
                  m.teams.team2 = teamData?.data.find((team) => team.id === match.team2Id) as Team;
                }
              });
            });
          });
          return { ...prev, roundRobinGroups: updatedGroups };
        }
        return prev;
      });
    },
    [setFixtureData, teamData?.data]
  );

  const showModalToUpdate = useCallback(
    (match: Match) => {
      dispatch(
        showModal(ModalKey.EDIT_MATCH, {
          tournamentId: tournamentData.id,
          referees: referees?.data || [],
          teamData: teamData?.data || [],
          match: match,
          onUpdate: handleUpdateFixture,
        })
      );
    },
    [dispatch, tournamentData.id, referees?.data, teamData?.data, handleUpdateFixture]
  );

  const handleClickMatchItem = useCallback(
    (match: Match) => {
      if (checkGeneratedFixture(tournamentData.phase)) {
        navigate(`/tournaments/${tournamentData.id}/matches/${match.id}`);
      } else {
        showModalToUpdate(match);
      }
    },
    [navigate, showModalToUpdate, tournamentData.id, tournamentData.phase]
  );

  const isLoading = fetchingRefereeData || fetchingTeamData;

  if (isLoading) {
    return <CenterLoading />;
  }

  if (!rounds || rounds.length === 0) {
    return <NoData message="No fixtures available" />;
  }

  return (
    <Container maxWidth="lg">
      <Stack
        direction="column"
        my={5}
      >
        {rounds.map((round, roundIndex) => (
          <Box
            key={roundIndex}
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {round.matches.map((match, matchIndex) => (
              <MatchItem
                key={matchIndex}
                match={match}
                onClick={() => handleClickMatchItem(match)}
              />
            ))}
          </Box>
        ))}
      </Stack>
    </Container>
  );
}
