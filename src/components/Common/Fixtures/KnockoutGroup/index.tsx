import { Box } from '@mui/material';
import produce from 'immer';
import { useCallback, useMemo } from 'react';
import { Bracket, IRoundProps } from 'react-brackets';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';

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

  const bracketRounds = useMemo<IRoundProps[]>(
    () =>
      rounds.map((round) => ({
        title: round.title,
        seeds: round.matches.map((match) => ({
          ...match,
          date: match.matchStartDate || '',
          teams: [match.teams.team1 || {}, match.teams.team2 || {}],
        })),
      })),
    [rounds]
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
                  m.refereeId = match.refereeId;
                  m.teams.team1 = teamData?.data.find((team) => team.id === match.team1Id) as Team;
                  m.teams.team2 = teamData?.data.find((team) => team.id === match.team2Id) as Team;
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
        })
      );
    },
    [dispatch, tournamentData.id, referees?.data, teamData?.data, handleUpdateFixture]
  );

  const handleClickSeedItem = useCallback(
    (match: Match) => {
      if (checkGeneratedFixture(tournamentData.phase)) {
        navigate(`/groups/${groupData.id}/tournaments/${tournamentData.id}/matches/${match.id}`);
      } else {
        showModalToUpdate(match);
      }
    },
    [groupData.id, navigate, showModalToUpdate, tournamentData.id, tournamentData.phase]
  );

  const isLoading = fetchingRefereeData || fetchingTeamData;

  if (isLoading) {
    return <CenterLoading />;
  }

  if (!rounds || rounds.length === 0) {
    return <NoData message="No fixtures available" />;
  }

  return (
    <Box mt={5}>
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
                borderRadius: 1,
                mx: 1,
                mb: 1,
                width: 400,
              }}
            >
              {title}
            </Box>
          );
        }}
        renderSeedComponent={(props) => (
          <CustomSeedItem
            {...props}
            onClick={handleClickSeedItem}
          />
        )}
      />
    </Box>
  );
}
