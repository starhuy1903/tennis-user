import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
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

  const handleRegister = async (tournamentId: number) => {
    dispatch(
      showModal(ModalKey.REGISTER_TOURNAMENT, {
        tournamentId,
        participantType: tournament.participantType,
        fetchMyApplication: () => navigate(`/tournaments/${tournament.id}/participants`),
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
        width: '300px',
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
