import { Box, Container, Stack } from '@mui/material';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'store';

import { ModalKey } from 'constants/modal';
import { showModal } from 'store/slice/modalSlice';
import { selectTournamentData } from 'store/slice/tournamentSlice';
import { Match, Round } from 'types/tournament-fixtures';

import NoData from '../../NoData';
import { MatchItem } from './MatchItem';

type RoundRobinFixtureProps = {
  rounds?: Round[];
  onUpdateMatch?: (matchData: any) => void;
};

export default function RoundRobinFixture({ rounds, onUpdateMatch }: RoundRobinFixtureProps) {
  const dispatch = useAppDispatch();
  const tournamentData = useAppSelector(selectTournamentData);

  const showModalToUpdate = useCallback(
    (match: Match) => {
      dispatch(
        showModal(ModalKey.ADD_MATCH, {
          tournamentId: tournamentData.id,
          match: match,
          onUpdate: onUpdateMatch,
        })
      );
    },
    [dispatch, tournamentData.id, onUpdateMatch]
  );

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
                onClick={() => showModalToUpdate(match)}
              />
            ))}
          </Box>
        ))}
      </Stack>
    </Container>
  );
}
