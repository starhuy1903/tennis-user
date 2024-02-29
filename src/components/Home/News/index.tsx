import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { Autoplay, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import NoData from 'components/Common/NoData';
import { limitString } from 'utils/string';

const itemData = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Vì sao bữa sáng là bữa quan trọng nhất trong ngày? Vì sao bữa sáng là bữa quan trọng nhất trong ngày?',
    date: '2023-10-10T16:10:00.000Z',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Vì sao bữa sáng',
    date: '2023-10-10T16:10:00.000Z',
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Vì sao bữa sáng là bữa quan trọng nhất trong ngày?',
    date: '2023-10-10T16:10:00.000Z',
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Vì sao bữa sáng là bữa quan trọng nhất trong ngày?',
    date: '2023-10-10T16:10:00.000Z',
  },
  {
    id: 5,
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Vì sao bữa sáng là bữa quan trọng nhất trong ngày?',
    date: '2023-10-10T16:10:00.000Z',
  },
  {
    id: 6,
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Vì sao bữa sáng là bữa quan trọng nhất trong ngày?',
    date: '2023-10-10T16:10:00.000Z',
  },
  {
    id: 7,
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Vì sao bữa sáng là bữa quan trọng nhất trong ngày?',
    date: '2023-10-10T16:10:00.000Z',
  },
  {
    id: 8,
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Vì sao bữa sáng là bữa quan trọng nhất trong ngày?',
    date: '2023-10-10T16:10:00.000Z',
  },
  {
    id: 9,
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Vì sao bữa sáng là bữa quan trọng nhất trong ngày?',
    date: '2023-10-10T16:10:00.000Z',
  },
  {
    id: 10,
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Vì sao bữa sáng là bữa quan trọng nhất trong ngày?',
    date: '2023-10-10T16:10:00.000Z',
  },
  {
    id: 11,
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Vì sao bữa sáng là bữa quan trọng nhất trong ngày?',
    date: '2023-10-10T16:10:00.000Z',
  },
  {
    id: 12,
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Vì sao bữa sáng là bữa quan trọng nhất trong ngày?',
    date: '2023-10-10T16:10:00.000Z',
  },
];

export default function News() {
  return (
    <Box>
      {itemData ? (
        <Swiper
          spaceBetween={20}
          slidesPerView={4}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          modules={[Autoplay, FreeMode]}
        >
          {itemData.map((item) => (
            <SwiperSlide key={item.img}>
              <Link to={`/news/${item.id}`}>
                <Box
                  sx={{
                    position: 'relative',
                    height: '250px',
                  }}
                >
                  <img
                    width="100%"
                    height="100%"
                    src={item.img}
                    alt={item.title}
                    style={{
                      borderRadius: '10px',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(to bottom, transparent, transparent, rgba(0, 0, 0, 0.8))',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'flex-end',
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      textAlign="justify"
                      color="white"
                      padding="20px 30px"
                    >
                      {limitString(item.title, 18)}
                    </Typography>
                  </Box>
                </Box>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <NoData />
      )}
    </Box>
  );
}
