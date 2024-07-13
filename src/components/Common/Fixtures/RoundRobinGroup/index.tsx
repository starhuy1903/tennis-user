import { Box, Container, Stack } from '@mui/material';
import produce from 'immer';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import { GroupTournamentPhase } from 'constants/group-tournament';
import { ModalKey } from 'constants/modal';
import { useGetTeamGroupTournamentQuery } from 'store/api/group/group-tournaments/creator/fixture';
import { useGetRefereesGroupTournamentQuery } from 'store/api/group/group-tournaments/creator/participant';
import { selectGroup } from 'store/slice/groupSlice';
import { selectGroupTournamentData } from 'store/slice/groupTournamentSlice';
import { showModal } from 'store/slice/modalSlice';
import { GroupFixtureResponse, isGeneratedNewRoundRobinGroupFixture } from 'types/group-tournament-fixtures';
import { EditMatchPayload } from 'types/match';
import { Match, Round, Team } from 'types/tournament-fixtures';
import { checkGeneratedFixture } from 'utils/group-tournament';

import NoData from '../../NoData';
import { MatchItem } from '../RoundRobin/MatchItem';

type RoundRobinGroupFixtureProps = {
  rounds: Round[];
  setFixtureData?: React.Dispatch<React.SetStateAction<GroupFixtureResponse | null>>;
};

export default function RoundRobinGroupFixture({ rounds, setFixtureData }: RoundRobinGroupFixtureProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const groupData = useAppSelector(selectGroup);
  const tournamentData = useAppSelector(selectGroupTournamentData);

  const { data: teamData, isLoading: fetchingTeamData } = useGetTeamGroupTournamentQuery(
    { groupId: groupData.id, tournamentId: tournamentData.id },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: referees, isLoading: fetchingRefereeData } = useGetRefereesGroupTournamentQuery({
    groupId: groupData.id,
    tournamentId: tournamentData.id,
  });

  const handleUpdateFixture = useCallback(
    (match: EditMatchPayload) => {
      setFixtureData?.((prev) => {
        if (prev && isGeneratedNewRoundRobinGroupFixture(prev)) {
          const updatedGroups = produce(prev.roundRobinGroups, (draftGroups) => {
            draftGroups?.[0].rounds.forEach((round) => {
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
          shouldUpdateToBE: tournamentData.phase === GroupTournamentPhase.GENERATED_FIXTURES,
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
        navigate(`/groups/${groupData.id}/tournaments/${tournamentData.id}/matches/${match.id}`);
      }
    },
    [groupData.id, navigate, tournamentData.id, tournamentData.phase]
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
                // TODO: check role
                isCreator
                match={match}
                onViewDetails={handleViewMatchDetails}
                onEdit={handleEditMatch}
              />
            ))}
          </Box>
        ))}
      </Stack>
    </Container>
  );
}
