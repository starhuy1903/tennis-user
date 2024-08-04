import { Box } from '@mui/material';
import produce from 'immer';
import { useCallback, useMemo } from 'react';
import { Bracket, IRoundProps } from 'react-brackets';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';

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
  isGeneratedNewKnockoutFixture,
} from 'types/tournament-fixtures';
import { checkGeneratedFixture } from 'utils/tournament';

import CenterLoading from '../CenterLoading';
import NoData from '../NoData';
import CustomSeedItem from './Knockout/SeedItem';

type KnockoutFixturesProps = {
  rounds: Round[];
  setFixtureData?: React.Dispatch<React.SetStateAction<FixtureResponse | null>>;
  isStandingTabs?: boolean;
};

const getKnockoutRoundName = (numRounds: number) => {
  const roundNames = [];

  // Generate generic round names
  for (let i = 1; i <= numRounds - 3; i++) {
    roundNames.push(`Round ${i}`);
  }

  // Add specific round names for the last three rounds
  if (numRounds >= 3) roundNames.push('Quarterfinals');
  if (numRounds >= 2) roundNames.push('Semifinals');
  if (numRounds >= 1) roundNames.push('Finals');

  return roundNames.slice(-numRounds);
};

export default function KnockoutFixtures({ rounds, setFixtureData, isStandingTabs }: KnockoutFixturesProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tournamentData = useAppSelector(selectTournamentData);
  const { isCreator } = useAppSelector(checkTournamentRole);
  const roundNames = useMemo(() => getKnockoutRoundName(rounds.length), [rounds]);

  const { data: teamData, isLoading: fetchingTeamData } = useGetTeamQuery(tournamentData.id, {
    refetchOnMountOrArgChange: true,
  });

  const { data: referees, isLoading: fetchingRefereeData } = useGetRefereesQuery(tournamentData.id);

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
        if (prev && (isGeneratedNewKnockoutFixture(prev) || isGeneratedNewGroupPlayoffFixture(prev))) {
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
          shouldUpdateToBE: tournamentData.phase === TournamentPhase.GENERATED_FIXTURES,
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
        navigate(`/tournaments/${tournamentData.id}/matches/${match.id}`);
      }
    },
    [navigate, tournamentData.id, tournamentData.phase]
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
                borderRadius: 1,
                mx: 1,
                mb: 1,
                width: 300,
              }}
            >
              {title}
            </Box>
          );
        }}
        renderSeedComponent={(props) => (
          <CustomSeedItem
            {...props}
            onViewDetails={handleClickSeedItem}
            onEdit={handleEditMatch}
            canEditMatch={isCreator && !isStandingTabs}
            canViewDetails={!isStandingTabs}
          />
        )}
      />
    </Box>
  );
}
