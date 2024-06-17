import { Box } from '@mui/material';
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import NoData from 'components/Common/NoData';
import { GroupTournament } from 'types/tournament';

import GroupTournamentItem from './GroupTournamentItem';

export default function GroupTournamentList({ tournaments }: { tournaments: GroupTournament[] }) {
  if (!tournaments || tournaments.length === 0) {
    return <NoData message="No tournaments found." />;
  }

  return (
    <Box>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          750: {
            slidesPerView: 2,
          },
          1080: {
            slidesPerView: 3,
          },
        }}
        spaceBetween={40}
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
