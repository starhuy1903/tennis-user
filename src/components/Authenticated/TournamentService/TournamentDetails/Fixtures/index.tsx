import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import { ModalKey } from 'constants/modal';
import { showModal } from 'store/slice/modalSlice';

import MatchItem from './MatchItem';
import MatchesList from './MatchesList';
import SetupFixture from './SetupFixture';

const participants = [];

const matches = [];

export default function Fixtures() {
  const dispatch = useAppDispatch();
  const tournament = useAppSelector((state) => state.tournament.data);
  const [matchesData, setMatchesData] = useState([]);

  const handleAddMatch = () => {
    if (!tournament) return;

    dispatch(
      showModal(ModalKey.ADD_MATCH, {
        tournamentId: tournament.id,
        participantType: tournament.participantType,
      })
    );
  };

  if (!tournament) {
    return <CenterLoading />;
  }

  return (
    <Box
      mt={4}
      mb={8}
    >
      <SetupFixture />
      {matchesData.length > 0 && <MatchesList matches={matchesData} />}
      <MatchItem data={matchesData[0]} />

      {/* Create match button */}
      <Box>
        <Button
          variant="text"
          onClick={handleAddMatch}
        >
          Add match
        </Button>
      </Box>
    </Box>
  );
}
