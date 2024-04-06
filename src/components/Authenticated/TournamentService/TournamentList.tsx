import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';

import NoData from 'components/Common/NoData';
import { OpenTournament } from 'types/tournament';

import TournamentItem from './TournamentItem';

export default function TournamentList({ tournaments }: { tournaments: OpenTournament[] }) {
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
            <TournamentItem tournament={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
