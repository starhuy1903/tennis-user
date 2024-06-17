import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Tooltip, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { TournamentStatus, defaultTournamentImage } from 'constants/tournament';
import { GroupTournament } from 'types/tournament';
import { displayDateRange } from 'utils/datetime';

export default function GroupTournamentItem({ tournament }: { tournament: GroupTournament }) {
  const navigate = useNavigate();

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
          <Typography variant="subtitle1">{`${tournament.participants}/${tournament.participants} participants`}</Typography>
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
