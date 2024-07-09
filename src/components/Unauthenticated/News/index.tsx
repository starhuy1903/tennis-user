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
      pb={8}
    >
      <Breadcrumbs />

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
                  <Card sx={{ maxWidth: 350 }}>
                    <CardMedia
                      component="img"
                      height="250"
                      image={item.image}
                      alt="news-image"
                    />
                    <CardContent
                      sx={{
                        minHeight: 230,
                      }}
                    >
                      <Typography variant="caption">
                        {displayDateTime({ dateTime: item.createdAt, targetFormat: FormatDateTime.DATE_AND_FULL_TIME })}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'text.primary',
                          fontWeight: 'bold',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          minHeight: 44,
                          cursor: 'pointer',
                        }}
                      >
                        {item.title}
                      </Typography>
                      {/* Limit description 5 rows */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 5,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {item.description}
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
