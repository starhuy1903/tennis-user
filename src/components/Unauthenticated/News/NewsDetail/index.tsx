import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BreadCrumb from 'components/Common/Breadcrumb';
import CenterLoading from 'components/Common/CenterLoading';
import NewsSwiper from 'components/Home/News';
import { useLazyGetNewsByIdQuery } from 'store/api/unauthenticated/newsApiSlice';
import { News } from 'types/news';
import { formatDateTime } from 'utils/datetime';

const breadcrumbs = [
  { title: 'Home', to: '/', active: true },
  { title: 'News', to: '/news', active: true },
];

export default function NewsDetail() {
  const navigate = useNavigate();

  const [news, setNews] = useState<News | null>(null);
  const { id } = useParams<{ id: string }>();

  const [getNews, { isLoading }] = useLazyGetNewsByIdQuery();

  const handleInvalidRequest = useCallback(() => {
    setNews(null);
    navigate('/news', { replace: true });
  }, [navigate]);

  useEffect(() => {
    if (!id) {
      handleInvalidRequest();
      return;
    }

    async function fetchData() {
      try {
        const res = await getNews(id!).unwrap();
        setNews(res);
      } catch (error) {
        console.log(error);
        handleInvalidRequest();
      }
    }

    fetchData();
  }, [getNews, handleInvalidRequest, id]);

  if (isLoading || !news) {
    return <CenterLoading />;
  }

  return (
    <Stack
      direction="column"
      gap={2}
      pt={2}
      pb={10}
    >
      <BreadCrumb breadcrumbs={breadcrumbs}></BreadCrumb>

      <Typography variant="h4">{news.title}</Typography>

      <Stack
        direction="row"
        gap={4}
      >
        <Box
          display="flex"
          gap={1}
        >
          <PersonOutlineIcon
            sx={{
              color: 'gray',
            }}
          />
          <Typography variant="subtitle1">{news.author}</Typography>
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
          <Typography variant="subtitle1">{formatDateTime(news.createdAt)}</Typography>
        </Box>
      </Stack>

      <Divider />

      <Typography variant="body1">{news.description}</Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img
          width={700}
          height={500}
          alt="news"
          src={news.image}
          loading="lazy"
        />
      </Box>

      <Typography variant="body1">{news.content}</Typography>

      <Divider
        sx={{
          my: 4,
        }}
      />

      <Stack
        direction="column"
        gap={2}
      >
        <Typography variant="h5">Other News</Typography>

        <NewsSwiper />
      </Stack>
    </Stack>
  );
}
