import AddIcon from '@mui/icons-material/Add';
import {
  Avatar,
  Box,
  Button,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';

import NoData from 'components/Common/NoData';
import { FormatDateTime } from 'constants/datetime';
import { ModalKey } from 'constants/modal';
import { GenderOptions } from 'constants/tournament';
import { useLazyGetRefereesQuery } from 'store/api/tournament/creator/participant';
import { useGetOpenTournamentParticipantsQuery } from 'store/api/tournament/shared/participant';
import { showModal } from 'store/slice/modalSlice';
import { checkTournamentRole, selectTournamentData } from 'store/slice/tournamentSlice';
import { UserProfile } from 'types/user';
import { displayDateTime } from 'utils/datetime';

const titles = ['Name', 'ELO', 'Email address', 'Gender', 'Applied date'];
const refereeTableTitle = ['', 'Name', 'Phone number', 'Gender'];

const ParticipantName = ({ user }: { user: UserProfile }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '20px' }}>
      <Avatar
        src={user.image}
        alt={user.name}
        sx={{ width: '50px', height: '50px' }}
      />
      <Typography variant="body1">{user.name}</Typography>
    </Box>
  );
};

const Cell = ({ children }: { children: React.ReactNode }) => {
  return (
    <TableCell align="center">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '40px',
        }}
      >
        {children}
      </Box>
    </TableCell>
  );
};

export default function ParticipantList() {
  const tournamentData = useAppSelector(selectTournamentData);
  const { isCreator } = useAppSelector(checkTournamentRole);
  const dispatch = useAppDispatch();

  const { data: participants, isLoading } = useGetOpenTournamentParticipantsQuery({
    page: 1,
    take: 10,
    tournamentId: tournamentData.id,
  });
  const [getReferees, { isLoading: fetchingRefereeData, data: referees }] = useLazyGetRefereesQuery();

  const handleGetRefereeData = useCallback(async () => {
    try {
      await getReferees(tournamentData.id).unwrap();
    } catch (err) {
      // handled error
    }
  }, [getReferees, tournamentData.id]);

  const handleAddReferee = useCallback(() => {
    dispatch(
      showModal(ModalKey.ADD_REFEREE, {
        tournamentId: tournamentData.id,
        onSubmit: handleGetRefereeData,
      })
    );
  }, [dispatch, handleGetRefereeData, tournamentData.id]);

  useEffect(() => {
    if (isCreator) {
      handleGetRefereeData();
    }
  }, [handleGetRefereeData, isCreator]);

  return (
    <Box my={4}>
      <Typography
        variant="h4"
        mb={2}
      >
        Participants
      </Typography>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="participant table"
        >
          <TableHead>
            <TableRow>
              {titles.map((title) => (
                <TableCell
                  align="center"
                  key={title}
                >
                  <Typography
                    variant="body1"
                    fontWeight={500}
                  >
                    {title}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              Array(3)
                .fill(null)
                .map(() => (
                  <TableRow>
                    <TableCell colSpan={titles.length}>
                      <Skeleton
                        variant="rectangular"
                        height={30}
                      />
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <>
                {participants && participants.data.length > 0 ? (
                  participants.data.map((row) => (
                    <TableRow
                      key={row.user1.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                      >
                        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
                          <ParticipantName user={row.user1} />
                          {row?.user2 && <ParticipantName user={row.user2} />}
                        </Box>
                      </TableCell>
                      <Cell>
                        <Box>{row.user1.elo || '--'}</Box>
                        {row.user2 && <Box>{row.user2.elo || '--'}</Box>}
                      </Cell>
                      <Cell>
                        <Box>{row.user1.email}</Box>
                        {row.user2 && <Box>{row.user2.email}</Box>}
                      </Cell>
                      <Cell>
                        <Box>{GenderOptions[row.user1.gender]}</Box>
                        {row.user2 && <Box>{GenderOptions[row.user1.gender]}</Box>}
                      </Cell>
                      <TableCell align="center">
                        {displayDateTime({
                          dateTime: row.appliedDate,
                          targetFormat: FormatDateTime.DATE_AND_FULL_TIME,
                        })}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={titles.length}>
                      <NoData />
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {isCreator && (
        <Stack mt={4}>
          <Box
            display="flex"
            justifyContent="space-between"
          >
            <Typography variant="h4">Referees</Typography>
            <Button
              variant="contained"
              onClick={handleAddReferee}
              startIcon={<AddIcon />}
            >
              Add Referee
            </Button>
          </Box>
          <TableContainer
            component={Paper}
            sx={{ mt: 2 }}
          >
            <Table
              sx={{ minWidth: 650 }}
              aria-label="referee table"
            >
              <TableHead>
                <TableRow>
                  {refereeTableTitle.map((title) => (
                    <TableCell key={title}>{title}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {fetchingRefereeData ? (
                  Array(3)
                    .fill(null)
                    .map(() => (
                      <TableRow>
                        <TableCell colSpan={refereeTableTitle.length}>
                          <Skeleton
                            variant="rectangular"
                            height={30}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                ) : referees && referees.data.length > 0 ? (
                  referees.data.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell
                        component="th"
                        scope="row"
                      >
                        <Avatar
                          src={row.image}
                          alt={row.name}
                          sx={{ width: '50px', height: '50px' }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="left"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="left"
                      >
                        {row.phoneNumber}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="left"
                      >
                        {GenderOptions[row.gender]}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={refereeTableTitle.length}>
                      <NoData />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      )}
    </Box>
  );
}
