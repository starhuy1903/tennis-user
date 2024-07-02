import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { Autoplay, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import CenterLoading from 'components/Common/CenterLoading';
import NoData from 'components/Common/NoData';
import { useLazyGetTopNewsQuery } from 'store/api/unauthenticated/newsApiSlice';
import { News as NewsType } from 'types/news';
import { limitString } from 'utils/string';

export default function News() {
  const [news, setNews] = useState<NewsType[]>([]);
  const [hasFetchedData, setHasFetchedData] = useState(false);

  const [getTopNews, { isLoading }] = useLazyGetTopNewsQuery();

  useEffect(() => {
    (async () => {
      try {
        const res = await getTopNews().unwrap();
        setNews(res);
      } catch (error) {
        console.log(error);
      } finally {
        setHasFetchedData(true);
      }
    })();
  }, [getTopNews]);

  if (!hasFetchedData || isLoading) {
    return <CenterLoading />;
  }

  if (hasFetchedData && news.length === 0) {
    return <NoData />;
  }

  return (
    <Box>
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        modules={[Autoplay, FreeMode]}
      >
        {news.map((item) => (
          <SwiperSlide key={item.id}>
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
                  src={item.image}
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
                    background: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8))',
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
                    padding="20px"
                  >
                    {limitString(item.title, 18)}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
