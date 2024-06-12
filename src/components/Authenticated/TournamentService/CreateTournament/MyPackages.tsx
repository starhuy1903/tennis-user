import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';

import NoData from 'components/Common/NoData';
import { UserPackage } from 'types/package';

import Pack from './Pack';

interface MyPackagesProps {
  packagesData: UserPackage[];
  onChooseMyPackage: (id: string) => void;
}

export default function MyPackages({ packagesData, onChooseMyPackage }: MyPackagesProps) {
  if (packagesData.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 500,
        }}
      >
        <NoData
          message={`You haven't owned a package that support creating tournament.`}
          gap={4}
        />
      </Box>
    );
  }

  return (
    <Box mt={2}>
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          720: {
            slidesPerView: 2,
          },
          1020: {
            slidesPerView: 3,
          },
        }}
      >
        {packagesData.map((item) => (
          <SwiperSlide
            key={item.id}
            style={{
              padding: '2px',
            }}
          >
            <Pack
              packageData={item}
              onChooseMyPackage={onChooseMyPackage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
