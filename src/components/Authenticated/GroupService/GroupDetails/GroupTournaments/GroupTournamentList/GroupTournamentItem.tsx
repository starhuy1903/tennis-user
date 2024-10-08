import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PeopleIcon from '@mui/icons-material/People';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store';

import { GroupTournamentFormatOptions, GroupTournamentStatus } from 'constants/group-tournament';
import { defaultTournamentImage } from 'constants/tournament';
import { selectGroup } from 'store/slice/groupSlice';
import { GroupTournament } from 'types/tournament';
import { displayDateRange } from 'utils/datetime';

export default function GroupTournamentItem({ tournament }: { tournament: GroupTournament }) {
  const navigate = useNavigate();
  const groupData = useAppSelector(selectGroup);

  const handleView = () => {
    navigate(`/groups/${groupData.id}/tournaments/${tournament.id}`);
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
              filter: tournament.status === GroupTournamentStatus.COMPLETED ? 'grayscale(100%)' : 'none',
              transition: 'filter 0.3s',
              width: '100%',
              height: '100%',
              objectFit: 'content',
            }}
            onMouseEnter={(event) => {
              if (tournament.status === GroupTournamentStatus.COMPLETED) {
                event.currentTarget.style.filter = 'grayscale(0%)';
              }
            }}
            onMouseLeave={(event) => {
              if (tournament.status === GroupTournamentStatus.COMPLETED) {
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
          <EmojiEventsIcon
            sx={{
              color: 'gray',
            }}
          />
          <Typography variant="subtitle1">{GroupTournamentFormatOptions[tournament.format]}</Typography>
        </Box>

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

        <Button
          fullWidth
          variant="outlined"
          sx={{
            mt: 2,
          }}
          onClick={handleView}
        >
          View
        </Button>
      </CardContent>
    </Card>
  );
}
