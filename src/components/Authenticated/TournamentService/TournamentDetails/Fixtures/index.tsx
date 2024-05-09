import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import NoData from 'components/Common/NoData';
import { ModalKey } from 'constants/modal';
import { TournamentFormat } from 'constants/tournament';
import { FixtureStatus } from 'constants/tournament-fixtures';
import { useLazyGetTournamentFixtureQuery } from 'store/api/tournament/tournamentFixtureApiSlice';
import { showModal } from 'store/slice/modalSlice';
import { TournamentFixture } from 'types/tournament-fixtures';
import { checkGeneratedFixture } from 'utils/tournament';

import GroupPlayoffFixture from './GroupPlayoffFixture';
import KnockoutFixtures from './KnockoutFixture';
import { RoundRobinFixture } from './RoundRobinFixture';
import SetupFixture from './SetupFixture';

export default function Fixtures() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [fixture, setFixture] = useState<TournamentFixture | null>(null);
  const { tournamentId } = useParams();
  const [getFixture, { isLoading }] = useLazyGetTournamentFixtureQuery();

  const tournamentData = useAppSelector((state) => state.tournament.data);

  const isCreator = !!tournamentData?.isCreator;

  const handleAddMatch = () => {
    if (!tournamentData) return;

    dispatch(
      showModal(ModalKey.ADD_MATCH, {
        tournamentId: tournamentData.id,
        participantType: tournamentData.participantType,
      })
    );
  };

  useEffect(() => {
    (async () => {
      if (tournamentData) {
        if (isCreator || checkGeneratedFixture(tournamentData.phase)) {
          try {
            const res = await getFixture(parseInt(tournamentId!)).unwrap();
            setFixture(res);
          } catch (error) {
            console.error(error);
          }
        }
      } else {
        navigate('/tournaments');
      }
    })();
  }, [getFixture, tournamentData, tournamentId, navigate, isCreator]);

  if (isLoading || !tournamentData) return <CenterLoading />;

  if (!isCreator && fixture?.status && [FixtureStatus.NEW, FixtureStatus.DRAFT].includes(fixture.status))
    return (
      <Box
        sx={{
          py: 10,
        }}
      >
        <NoData message="The fixture has not been published yet." />
      </Box>
    );

  return (
    <Box mt={4}>
      {isCreator && fixture?.status === FixtureStatus.NEW && <SetupFixture />}
      {fixture?.format === TournamentFormat.KNOCKOUT && <KnockoutFixtures fixture={fixture} />}
      {fixture?.format === TournamentFormat.ROUND_ROBIN && <RoundRobinFixture fixture={fixture} />}
      {fixture?.format === TournamentFormat.GROUP_PLAYOFF && <GroupPlayoffFixture fixture={fixture} />}

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
