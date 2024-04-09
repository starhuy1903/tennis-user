import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';

import NoData from 'components/Common/NoData';
import { GroupTournament } from 'types/tournament';

import GroupTournamentItem from './GroupTournamentItem';

export default function GroupTournamentList({ tournaments }: { tournaments: GroupTournament[] }) {
  if (!tournaments || tournaments.length === 0) {
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
            <GroupTournamentItem tournament={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
