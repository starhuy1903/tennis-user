import { Card, CardActionArea, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Breadcrumbs } from 'components/Common/Breadcrumb';
import CenterLoading from 'components/Common/CenterLoading';
import NoData from 'components/Common/NoData';
import { FormatDateTime } from 'constants/datetime';
import { useLazyGetNewsQuery } from 'store/api/unauthenticated/newsApiSlice';
import { News as NewsType } from 'types/news';
import { displayDateTime } from 'utils/datetime';
import { limitString } from 'utils/string';

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

  return (
    <Stack
      direction="column"
      gap={2}
    >
      <Breadcrumbs />

      <Typography variant="h4">News</Typography>
      {hasFetchedData && news.length > 0 ? (
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
                      <Typography variant="caption">
                        {displayDateTime({ dateTime: item.createdAt, targetFormat: FormatDateTime.DATE_AND_FULL_TIME })}
                      </Typography>
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
      ) : (
        <NoData />
      )}
    </Stack>
  );
}
