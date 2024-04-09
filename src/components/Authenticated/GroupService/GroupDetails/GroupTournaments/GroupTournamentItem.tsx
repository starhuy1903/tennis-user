import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { TournamentStatus } from 'constants/tournament';
import { GroupTournament } from 'types/tournament';
import { displayDateRange } from 'utils/datetime';

export default function GroupTournamentItem({ tournament }: { tournament: GroupTournament }) {
  const navigate = useNavigate();

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
          image={tournament.imageUrl}
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
          <Typography variant="subtitle1">{`${tournament.participants} participants`}</Typography>
        </Box>

        <Button
          fullWidth
          variant="outlined"
          sx={{
            mt: 2,
          }}
          onClick={() => {
            navigate(`/groups/${tournament.group.id}/tournaments/${tournament.id}`);
          }}
        >
          View
        </Button>
      </CardContent>
    </Card>
  );
}
