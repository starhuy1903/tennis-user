import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Tooltip, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store';

import { ModalKey } from 'constants/modal';
import { TournamentStatus, defaultTournamentImage } from 'constants/tournament';
import { showModal } from 'store/slice/modalSlice';
import { OpenTournament } from 'types/tournament';
import { checkExpiredDate, displayDateRange, displayDayLeft } from 'utils/datetime';

export default function TournamentItem({
  tournament,
  isRegisterable = false,
}: {
  tournament: OpenTournament;
  isRegisterable?: boolean;
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegister = (tournamentId: number) => {
    dispatch(
      showModal(ModalKey.REGISTER_TOURNAMENT, {
        tournamentId,
        participantType: tournament.participantType,
        onSuccess: () => navigate(`/tournaments/${tournament.id}/participants`),
      })
    );
  };

  const handleView = () => {
    navigate(`/tournaments/${tournament.id}`);
  };

  return (
    <Card
      sx={{
        my: 2,
        position: 'relative',
      }}
    >
      <CardActionArea onClick={handleView}>
        <Box
          sx={{
            height: '200px',
          }}
        >
          <CardMedia
            component="img"
            image={tournament.image || defaultTournamentImage}
            alt="news-image"
            sx={{
              filter: tournament.status === TournamentStatus.COMPLETED ? 'grayscale(100%)' : 'none',
              transition: 'filter 0.3s',
              width: '100%',
              height: '100%',
              objectFit: 'content',
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
        </Box>
      </CardActionArea>

      <CardContent>
        <Tooltip title={tournament.name}>
          <Typography
            variant="h6"
            fontWeight="bold"
            noWrap
            gutterBottom
          >
            {tournament.name}
          </Typography>
        </Tooltip>

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

        <Box>
          {tournament.status === TournamentStatus.UPCOMING && (
            <Box
              display="flex"
              gap={1}
              color="red"
            >
              <AccessTimeIcon />
              <Typography variant="subtitle1">
                {checkExpiredDate(tournament.registrationDueDate)
                  ? 'Registration has expired'
                  : displayDayLeft(tournament.registrationDueDate)}
              </Typography>
            </Box>
          )}

          {isRegisterable && (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<AppRegistrationIcon />}
              sx={{
                mt: 2,
              }}
              onClick={() => handleRegister(tournament.id)}
            >
              Register
            </Button>
          )}
        </Box>

        <Button
          component={Link}
          to={`/tournaments/${tournament.id}`}
          fullWidth
          variant="outlined"
          startIcon={<VisibilityIcon />}
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
