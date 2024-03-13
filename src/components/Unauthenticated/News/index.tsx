import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import BreadCrumb from 'components/Common/Breadcrumb';
import CenterLoading from 'components/Common/CenterLoading';
import NoData from 'components/Common/NoData';
import { useLazyGetNewsQuery } from 'store/api/unauthenticated/newsApiSlice';
import { News as NewsType } from 'types/news';
import { formatDateTime } from 'utils/datetime';
import { limitString } from 'utils/string';

const breadcrumbs = [
  { title: 'Home', to: '/' },
  { title: 'News', to: '/news' },
];

export default function News() {
  const [news, setNews] = useState<NewsType[]>([]);
  const [hasFetchedData, setHasFetchedData] = useState(false);

  const [getNews, { isLoading }] = useLazyGetNewsQuery();

  useEffect(() => {
    (async () => {
      try {
        const res = await getNews().unwrap();
        setNews(res);
      } catch (error) {
        console.log(error);
      } finally {
        setHasFetchedData(true);
      }
    })();
  }, [getNews]);

  if (!hasFetchedData || isLoading) {
    return <CenterLoading />;
  }

  if (hasFetchedData && news.length === 0) {
    return <NoData />;
  }

  return (
    <>
      <Typography variant="h4">News</Typography>

      <Box sx={{ my: 2 }}>
        <BreadCrumb breadcrumbs={breadcrumbs}></BreadCrumb>
      </Box>

      <Grid
        container
        spacing={3}
      >
        {news.map((item) => (
          <Grid
            item
            key={item.id}
          >
            <Link
              to={`/news/${item.id}`}
              style={{
                textDecoration: 'none',
              }}
            >
              <CardActionArea>
                <Card sx={{ maxWidth: 350, minHeight: 460 }}>
                  <CardMedia
                    component="img"
                    height="250"
                    image={item.image}
                    alt="news-image"
                  />
                  <CardContent>
                    <Typography variant="caption">{formatDateTime(item.createdAt)}</Typography>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                    >
                      {limitString(item.title, 12)}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="justify"
                    >
                      {limitString(item.description, 40)}
                    </Typography>
                  </CardContent>
                </Card>
              </CardActionArea>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
