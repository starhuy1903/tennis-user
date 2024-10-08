import { Chip, Container, Divider, Stack } from '@mui/material';
import produce from 'immer';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';

import { MatchItem } from 'components/Authenticated/TournamentService/Common/MatchItem';
import CenterLoading from 'components/Common/CenterLoading';
import { ModalKey } from 'constants/modal';
import { TournamentPhase } from 'constants/tournament';
import { useGetTeamQuery } from 'store/api/tournament/creator/fixture';
import { useGetRefereesQuery } from 'store/api/tournament/creator/participant';
import { showModal } from 'store/slice/modalSlice';
import { checkTournamentRole, selectTournamentData } from 'store/slice/tournamentSlice';
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

type RoundRobinFixtureProps = {
  rounds: Round[];
  setFixtureData?: React.Dispatch<React.SetStateAction<FixtureResponse | null>>;
  isSchedule?: boolean;
  inGroupPlayoff?: boolean;
};

export default function RoundRobinFixture({
  rounds,
  setFixtureData,
  isSchedule,
  inGroupPlayoff,
}: RoundRobinFixtureProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tournamentData = useAppSelector(selectTournamentData);
  const { isCreator } = useAppSelector(checkTournamentRole);

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
          shouldUpdateToBE: tournamentData.phase === TournamentPhase.GENERATED_FIXTURES,
        })
      );
    },
    [dispatch, tournamentData.id, tournamentData.phase, referees?.data, teamData?.data, handleUpdateFixture]
  );

  const handleEditMatch = useCallback(
    (match: Match) => {
      showModalToUpdate(match);
    },
    [showModalToUpdate]
  );

  const handleViewMatchDetails = useCallback(
    (match: Match) => {
      if (checkGeneratedFixture(tournamentData.phase)) {
        navigate(`/tournaments/${tournamentData.id}/matches/${match.id}`);
      }
    },
    [navigate, tournamentData.id, tournamentData.phase]
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
        my={1}
        gap={inGroupPlayoff ? 1 : 4}
        alignItems="center"
      >
        {rounds.map((round) => (
          <Stack width="100%">
            {!inGroupPlayoff && (
              <Divider>
                <Chip
                  label={round.title}
                  size="medium"
                  color="info"
                  sx={{ fontSize: 20 }}
                />
              </Divider>
            )}

            <Stack
              key={round.id}
              gap={1}
              sx={{
                width: '100%',
              }}
              alignItems="center"
              mt={2}
            >
              {round.matches.map((match) => (
                <MatchItem
                  key={match.id}
                  isCreator={isCreator}
                  match={match}
                  onEdit={handleEditMatch}
                  onViewDetails={handleViewMatchDetails}
                  canGoToMatchDetails={checkGeneratedFixture(tournamentData.phase) && !isSchedule}
                  type="schedule"
                  wrapperSx={{ maxWidth: 600, width: isCreator ? 600 : 400 }}
                  isScheduleMatch={isSchedule}
                />
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Container>
  );
}
