import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import BreadCrumb from 'components/Common/Breadcrumb';
import { formatDateTime } from 'utils/datetime';
import { limitString } from 'utils/string';

const news = [
  {
    id: 1,
    title: 'Vì sao bữa sáng là bữa quan trọng nhất trong ngày?',
    image: 'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg',
    date: '2023-10-10T16:10:00.000Z',
    description: 'Theo nhiều nghi cách khác, bữa sáng chiếm 15% - 25% tổng năng lượng bạn cần nạp mỗi ngày....',
  },
  {
    id: 2,
    title: 'Vì sao bữa sáng là bữa quan trọng nhất trong ngày?',
    image: 'https://api-news.vba.vn/storage/images/1696931611_post%20web%202.jpg',
    date: '2023-10-10T16:10:00.000Z',
    description:
      'Theo nhiều nghiên cứu về sức khỏe, bữa sáng là thời điểm bạn cung cấp cho cơ thể những nguồn năng lượng & dưỡng chất cho hầu hết các hoạt động sẽ diễn ra trong ngày; hay nói cách khác, bữa sáng chiếm 15% - 25% tổng năng lượng bạn cần nạp mỗi ngày....',
  },
  {
    id: 3,
    title: 'Vì sao bữa sáng là bữa quan trọng nhất trong ngày?',
    image: 'https://api-news.vba.vn/storage/images/1696931611_post%20web%202.jpg',
    date: '2023-10-10T16:10:00.000Z',
    description:
      'Theo nhiều nghiên cứu về sức khỏe, bữa sáng là thời điểm bạn cung cấp cho cơ thể những nguồn năng lượng & dưỡng chất cho hầu hết các hoạt động sẽ diễn ra trong ngày; hay nói cách khác, bữa sáng chiếm 15% - 25% tổng năng lượng bạn cần nạp mỗi ngày....',
  },
  {
    id: 4,
    title: 'Vì sao bữa sáng là bữa quan trọng nhất trong ngày?',
    image: 'https://api-news.vba.vn/storage/images/1696931611_post%20web%202.jpg',
    date: '2023-10-10T16:10:00.000Z',
    description:
      'Theo nhiều nghiên cứu về sức khỏe, bữa sáng là thời điểm bạn cung cấp cho cơ thể những nguồn năng lượng & dưỡng chất cho hầu hết các hoạt động sẽ diễn ra trong ngày; hay nói cách khác, bữa sáng chiếm 15% - 25% tổng năng lượng bạn cần nạp mỗi ngày....',
  },
  {
    id: 5,
    title: 'Vì sao bữa sáng là bữa quan trọng nhất trong ngày?',
    image: 'https://api-news.vba.vn/storage/images/1696931611_post%20web%202.jpg',
    date: '2023-10-10T16:10:00.000Z',
    description:
      'Theo nhiều nghiên cứu về sức khỏe, bữa sáng là thời điểm bạn cung cấp cho cơ thể những nguồn năng lượng & dưỡng chất cho hầu hết các hoạt động sẽ diễn ra trong ngày; hay nói cách khác, bữa sáng chiếm 15% - 25% tổng năng lượng bạn cần nạp mỗi ngày....',
  },
  {
    id: 6,
    title: 'Vì sao bữa sáng là bữa quan trọng nhất trong ngày?',
    image: 'https://api-news.vba.vn/storage/images/1696931611_post%20web%202.jpg',
    date: '2023-10-10T16:10:00.000Z',
    description:
      'Theo nhiều nghiên cứu về sức khỏe, bữa sáng là thời điểm bạn cung cấp cho cơ thể những nguồn năng lượng & dưỡng chất cho hầu hết các hoạt động sẽ diễn ra trong ngày; hay nói cách khác, bữa sáng chiếm 15% - 25% tổng năng lượng bạn cần nạp mỗi ngày....',
  },
];

const breadcrumbs = [
  <Link
    underline="hover"
    key="1"
    color="inherit"
    href="/"
  >
    Home
  </Link>,
  <Typography
    key="2"
    color="text.primary"
  >
    News
  </Typography>,
];

export default function News() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 2 }}>
        <BreadCrumb breadcrumbs={breadcrumbs}></BreadCrumb>
      </Box>

      <Grid
        container
        spacing={6}
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
                    <Typography variant="caption">{formatDateTime(item.date)}</Typography>
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
    </Container>
  );
}
