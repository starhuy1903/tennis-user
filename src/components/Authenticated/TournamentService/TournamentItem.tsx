import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'store';

import { ModalKey } from 'constants/modal';
import { TournamentStatus } from 'constants/tournament';
import { showModal } from 'store/slice/modalSlice';
import { OpenTournament } from 'types/tournament';
import { displayDateRange, displayDayLeft } from 'utils/datetime';

export default function TournamentItem({ tournament }: { tournament: OpenTournament }) {
  const dispatch = useAppDispatch();

  const handleRegister = async (tournamentId: number) => {
    dispatch(showModal(ModalKey.REGISTER_TOURNAMENT, { tournamentId }));
  };

  return (
    <Card
      sx={{
        my: 2,
        position: 'relative',
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={tournament.image}
          alt="news-image"
          sx={{
            filter: tournament.status === TournamentStatus.COMPLETED ? 'grayscale(100%)' : 'none',
            transition: 'filter 0.3s',
          }}
          onMouseEnter={(event) => {
            if (tournament.status === TournamentStatus.COMPLETED) {
              event.currentTarget.style.filter = 'grayscale(0%)';
            }
          }}
          onMouseLeave={(event) => {
            if (tournament.status === TournamentStatus.COMPLETED) {
              event.currentTarget.style.filter = 'grayscale(100%)';
            }
          }}
        />

        {/* <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: (theme) => theme.palette.primary.main,
            backgroundColor: 'white',
            borderRadius: '20%',
            padding: '2px 2px 0px',
          }}
        >
          {tournament.scope === TournamentScope.OPEN ? (
            <Tooltip title="Public Tournament">
              <PublicIcon />
            </Tooltip>
          ) : (
            <Tooltip title="Private Tournament">
              <LockIcon />
            </Tooltip>
          )}
        </Box> */}
      </CardActionArea>

      <CardContent>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
        >
          {tournament.name}
        </Typography>
        <Box
          display="flex"
          gap={1}
        >
          <CalendarMonthIcon
            sx={{
              color: 'gray',
            }}
          />
          <Typography variant="subtitle1">{displayDateRange(tournament.startDate, tournament.endDate)}</Typography>
        </Box>

        <Box
          display="flex"
          gap={1}
        >
          <PeopleIcon
            sx={{
              color: 'gray',
            }}
          />
          <Typography variant="subtitle1">{`${tournament.participants}/${tournament.maxParticipants} participants`}</Typography>
        </Box>

        {tournament.status === TournamentStatus.UPCOMING && (
          <Box>
            <Box
              display="flex"
              gap={1}
              color="red"
            >
              <AccessTimeIcon />
              <Typography variant="subtitle1">{displayDayLeft(tournament.registrationDueDate)}</Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 2,
              }}
              onClick={() => handleRegister(tournament.id)}
            >
              Register
            </Button>
          </Box>
        )}

        <Button
          component={Link}
          to={`/tournaments/${tournament.id}`}
          fullWidth
          variant="outlined"
          sx={{
            mt: 2,
          }}
        >
          View
        </Button>
      </CardContent>
    </Card>
  );
}
