import { Box } from '@mui/material';
import produce from 'immer';
import { useCallback, useMemo } from 'react';
import { Bracket, IRoundProps } from 'react-brackets';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';

import { GroupTournamentPhase } from 'constants/group-tournament';
import { ModalKey } from 'constants/modal';
import { useGetTeamGroupTournamentQuery } from 'store/api/group/group-tournaments/creator/fixture';
import { useGetRefereesGroupTournamentQuery } from 'store/api/group/group-tournaments/creator/participant';
import { selectGroup } from 'store/slice/groupSlice';
import { selectGroupTournamentData } from 'store/slice/groupTournamentSlice';
import { showModal } from 'store/slice/modalSlice';
import { GroupFixtureResponse, isGeneratedNewKnockoutGroupFixture } from 'types/group-tournament-fixtures';
import { EditMatchPayload } from 'types/match';
import { Match, Round, Team } from 'types/tournament-fixtures';
import { checkGeneratedFixture } from 'utils/group-tournament';
import { getKnockoutRoundName } from 'utils/schedule';

import CenterLoading from '../../CenterLoading';
import NoData from '../../NoData';
import CustomSeedItem from '../Knockout/SeedItem';

type KnockoutGroupFixtureProps = {
  rounds: Round[];
  setFixtureData?: React.Dispatch<React.SetStateAction<GroupFixtureResponse | null>>;
};

export default function KnockoutGroupFixture({ rounds, setFixtureData }: KnockoutGroupFixtureProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const groupData = useAppSelector(selectGroup);
  const tournamentData = useAppSelector(selectGroupTournamentData);
  const roundNames = useMemo(() => getKnockoutRoundName(rounds.length), [rounds]);

  const { data: teamData, isLoading: fetchingTeamData } = useGetTeamGroupTournamentQuery(
    { groupId: groupData.id, tournamentId: tournamentData.id },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: referees, isLoading: fetchingRefereeData } = useGetRefereesGroupTournamentQuery(
    {
      groupId: groupData.id,
      tournamentId: tournamentData.id,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const bracketRounds = useMemo<IRoundProps[]>(
    () =>
      rounds.map((round, roundIndex) => ({
        title: roundNames[roundIndex],
        seeds: round.matches.map((match) => ({
          ...match,
          date: match.matchStartDate || '',
          teams: [match.teams.team1 || {}, match.teams.team2 || {}],
          isFinalMatch: roundIndex === rounds.length - 1,
        })),
      })),
    [roundNames, rounds]
  );

  const handleUpdateFixture = useCallback(
    (match: EditMatchPayload) => {
      setFixtureData?.((prev) => {
        if (prev && isGeneratedNewKnockoutGroupFixture(prev)) {
          const updatedKnockoutGroup = produce(prev.knockoutGroup, (draftGroups) => {
            draftGroups.rounds.forEach((round) => {
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
          return { ...prev, knockoutGroup: updatedKnockoutGroup };
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

  const handleClickSeedItem = useCallback(
    (match: Match) => {
      const canGotToMatchDetails =
        checkGeneratedFixture(tournamentData.phase) && match.teams.team1.id && match.teams.team2.id;
      if (canGotToMatchDetails) {
        navigate(`/groups/${groupData.id}/tournaments/${tournamentData.id}/matches/${match.id}`);
      }
    },
    [groupData.id, navigate, tournamentData.id, tournamentData.phase]
  );

  const handleEditMatch = useCallback(
    (match: Match) => {
      showModalToUpdate(match);
    },
    [showModalToUpdate]
  );

  const isLoading = fetchingRefereeData || fetchingTeamData;

  if (isLoading) {
    return <CenterLoading />;
  }

  if (!rounds || rounds.length === 0) {
    return <NoData message="No fixtures available" />;
  }

  return (
    <Box
      mt={5}
      sx={{ overflow: 'auto' }}
    >
      <Bracket
        rounds={bracketRounds}
        roundTitleComponent={(title) => {
          return (
            <Box
              sx={{
                color: 'white',
                backgroundColor: (theme) => theme.palette.primary.main,
                textAlign: 'center',
                fontWeight: 'bold',
                padding: 1.5,
                borderRadius: 4,
                mx: 1,
                mb: 1,
                width: 500,
              }}
            >
              {title}
            </Box>
          );
        }}
        renderSeedComponent={(props) => (
          <CustomSeedItem
            isCreator={groupData.isCreator}
            onEdit={handleEditMatch}
            onViewDetails={handleClickSeedItem}
            type="schedule"
            shouldShowElo={false}
            isScheduleMatch
            {...props}
          />
        )}
      />
    </Box>
  );
}
