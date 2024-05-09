import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';

import NoData from 'components/Common/NoData';
import { OpenTournament } from 'types/tournament';

import TournamentItem from './TournamentItem';

export default function TournamentList({
  tournaments,
  isRegisterable,
}: {
  tournaments: OpenTournament[];
  isRegisterable?: boolean;
}) {
  if (tournaments.length === 0) {
    return <NoData message="No tournaments found." />;
  }

  return (
    <Box>
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
      >
        {tournaments.map((item) => (
          <SwiperSlide key={item.id}>
            <TournamentItem
              tournament={item}
              isRegisterable={isRegisterable}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
