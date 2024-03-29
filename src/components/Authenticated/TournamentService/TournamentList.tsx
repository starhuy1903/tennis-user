import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LockIcon from '@mui/icons-material/Lock';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Tooltip, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';

import NoData from 'components/Common/NoData';
import { Tournament, TournamentStatus } from 'types/tournament';
import { displayDateRange, displayDayLeft } from 'utils/datetime';

export default function TournamentList({ tournaments }: { tournaments: Tournament[] }) {
  if (tournaments.length === 0) {
    return <NoData />;
  }

  return (
    <Box>
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
      >
        {tournaments.map((item) => (
          <SwiperSlide key={item.id}>
            <Card
              sx={{
                my: 2,
                position: 'relative',
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={item.image}
                  alt="news-image"
                  sx={{
                    filter: item.status === TournamentStatus.COMPLETED ? 'grayscale(100%)' : 'none',
                    transition: 'filter 0.3s',
                  }}
                  onMouseEnter={(event) => {
                    if (item.status === TournamentStatus.COMPLETED) {
                      event.currentTarget.style.filter = 'grayscale(0%)';
                    }
                  }}
                  onMouseLeave={(event) => {
                    if (item.status === TournamentStatus.COMPLETED) {
                      event.currentTarget.style.filter = 'grayscale(100%)';
                    }
                  }}
                />

                <Box
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
                  {item.isPublic ? (
                    <Tooltip title="Public tournament">
                      <PublicIcon />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Private tournament">
                      <LockIcon />
                    </Tooltip>
                  )}
                </Box>
              </CardActionArea>

              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                >
                  {item.name}
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
                  <Typography variant="subtitle1">{displayDateRange(item.startDate, item.endDate)}</Typography>
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
                  <Typography variant="subtitle1">{`${item.participants}/${item.maxParticipants} participants`}</Typography>
                </Box>

                {item.status === TournamentStatus.UPCOMING && (
                  <Box>
                    <Box
                      display="flex"
                      gap={1}
                      color="red"
                    >
                      <AccessTimeIcon />
                      <Typography variant="subtitle1">{displayDayLeft(item.registrationDueDate)}</Typography>
                    </Box>

                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{
                        mt: 2,
                      }}
                    >
                      Register
                    </Button>
                  </Box>
                )}

                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    mt: 2,
                  }}
                >
                  View
                </Button>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
