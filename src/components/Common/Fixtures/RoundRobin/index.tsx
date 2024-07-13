import { Box, Container, Divider, Stack } from '@mui/material';
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
import {
  FixtureResponse,
  Match,
  Round,
  Team,
  isGeneratedNewGroupPlayoffFixture,
  isGeneratedNewRoundRobinFixture,
} from 'types/tournament-fixtures';
import { checkGeneratedFixture } from 'utils/tournament';

import NoData from '../../NoData';
import { MatchItem } from './MatchItem';

type RoundRobinFixtureProps = {
  rounds: Round[];
  setFixtureData?: React.Dispatch<React.SetStateAction<FixtureResponse | null>>;
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
        if (prev && (isGeneratedNewRoundRobinFixture(prev) || isGeneratedNewGroupPlayoffFixture(prev))) {
          const updatedGroups = produce(prev.roundRobinGroups, (draftGroups) => {
            draftGroups.forEach((groups) => {
              groups.rounds.forEach((round) => {
                round.matches.forEach((m) => {
                  if (m.id === match.id) {
                    m.title = match.name;
                    m.matchStartDate = match.dateTime;
                    m.duration = match.duration;
                    m.venue = match.venue;
                    m.refereeId = match.refereeId || null;
                    m.teams.team1 = (teamData?.data.find((team) => team.id === match.team1Id) as Team) || null;
                    m.teams.team2 = (teamData?.data.find((team) => team.id === match.team2Id) as Team) || null;
                  }
                });
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
      <Stack my={1}>
        {rounds.map((round) => (
          <Stack
            key={round.id}
            gap={1}
            sx={{
              width: '100%',
            }}
          >
            {round.matches.map((match) => (
              <Box key={match.id}>
                <Divider
                  orientation="horizontal"
                  flexItem
                />
                <MatchItem
                  match={match}
                  onClick={() => handleClickMatchItem(match)}
                />
              </Box>
            ))}
          </Stack>
        ))}
      </Stack>
    </Container>
  );
}
