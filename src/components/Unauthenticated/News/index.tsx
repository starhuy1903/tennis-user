import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import BreadCrumb from 'components/Common/Breadcrumb';
import { formatDateTime } from 'utils/datetime';
import { limitString } from 'utils/string';

const news = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Vì sao bữa sáng là bữa quan trọng nhất trong ngày? Vì sao bữa sáng là bữa quan trọng nhất trong ngày?',
    date: '2023-10-10T16:10:00.000Z',
    description:
      'Theo nhiều nghiên cứu về sức khỏe, bữa sáng là thời điểm bạn cung cấp cho cơ thể những nguồn năng lượng & dưỡng chất cho hầu hết các hoạt động sẽ diễn ra trong ngày; hay nói cách khác, bữa sáng chiếm 15% - 25% tổng năng lượng bạn cần nạp mỗi ngày....',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Vì sao bữa sáng',
    date: '2023-10-10T16:10:00.000Z',
    description:
      'Theo nhiều nghiên cứu về sức khỏe, bữa sáng là thời điểm bạn cung cấp cho cơ thể những nguồn năng lượng & dưỡng chất cho hầu hết các hoạt động sẽ diễn ra trong ngày; hay nói cách khác, bữa sáng chiếm 15% - 25% tổng năng lượng bạn cần nạp mỗi ngày....',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Vì sao bữa sáng là bữa quan trọng nhất trong ngày?',
    date: '2023-10-10T16:10:00.000Z',
    description:
      'Theo nhiều nghiên cứu về sức khỏe, bữa sáng là thời điểm bạn cung cấp cho cơ thể những nguồn năng lượng & dưỡng chất cho hầu hết các hoạt động sẽ diễn ra trong ngày; hay nói cách khác, bữa sáng chiếm 15% - 25% tổng năng lượng bạn cần nạp mỗi ngày....',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Vì sao bữa sáng là bữa quan trọng nhất trong ngày?',
    date: '2023-10-10T16:10:00.000Z',
    description:
      'Theo nhiều nghiên cứu về sức khỏe, bữa sáng là thời điểm bạn cung cấp cho cơ thể những nguồn năng lượng & dưỡng chất cho hầu hết các hoạt động sẽ diễn ra trong ngày; hay nói cách khác, bữa sáng chiếm 15% - 25% tổng năng lượng bạn cần nạp mỗi ngày....',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Vì sao bữa sáng là bữa quan trọng nhất trong ngày?',
    date: '2023-10-10T16:10:00.000Z',
    description:
      'Theo nhiều nghiên cứu về sức khỏe, bữa sáng là thời điểm bạn cung cấp cho cơ thể những nguồn năng lượng & dưỡng chất cho hầu hết các hoạt động sẽ diễn ra trong ngày; hay nói cách khác, bữa sáng chiếm 15% - 25% tổng năng lượng bạn cần nạp mỗi ngày....',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Vì sao bữa sáng là bữa quan trọng nhất trong ngày?',
    date: '2023-10-10T16:10:00.000Z',
    description:
      'Theo nhiều nghiên cứu về sức khỏe, bữa sáng là thời điểm bạn cung cấp cho cơ thể những nguồn năng lượng & dưỡng chất cho hầu hết các hoạt động sẽ diễn ra trong ngày; hay nói cách khác, bữa sáng chiếm 15% - 25% tổng năng lượng bạn cần nạp mỗi ngày....',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Vì sao bữa sáng là bữa quan trọng nhất trong ngày?',
    date: '2023-10-10T16:10:00.000Z',
    description:
      'Theo nhiều nghiên cứu về sức khỏe, bữa sáng là thời điểm bạn cung cấp cho cơ thể những nguồn năng lượng & dưỡng chất cho hầu hết các hoạt động sẽ diễn ra trong ngày; hay nói cách khác, bữa sáng chiếm 15% - 25% tổng năng lượng bạn cần nạp mỗi ngày....',
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Vì sao bữa sáng là bữa quan trọng nhất trong ngày?',
    date: '2023-10-10T16:10:00.000Z',
    description:
      'Theo nhiều nghiên cứu về sức khỏe, bữa sáng là thời điểm bạn cung cấp cho cơ thể những nguồn năng lượng & dưỡng chất cho hầu hết các hoạt động sẽ diễn ra trong ngày; hay nói cách khác, bữa sáng chiếm 15% - 25% tổng năng lượng bạn cần nạp mỗi ngày....',
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Vì sao bữa sáng là bữa quan trọng nhất trong ngày?',
    date: '2023-10-10T16:10:00.000Z',
    description:
      'Theo nhiều nghiên cứu về sức khỏe, bữa sáng là thời điểm bạn cung cấp cho cơ thể những nguồn năng lượng & dưỡng chất cho hầu hết các hoạt động sẽ diễn ra trong ngày; hay nói cách khác, bữa sáng chiếm 15% - 25% tổng năng lượng bạn cần nạp mỗi ngày....',
  },
  {
    id: 10,
    image: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Vì sao bữa sáng là bữa quan trọng nhất trong ngày?',
    date: '2023-10-10T16:10:00.000Z',
    description:
      'Theo nhiều nghiên cứu về sức khỏe, bữa sáng là thời điểm bạn cung cấp cho cơ thể những nguồn năng lượng & dưỡng chất cho hầu hết các hoạt động sẽ diễn ra trong ngày; hay nói cách khác, bữa sáng chiếm 15% - 25% tổng năng lượng bạn cần nạp mỗi ngày....',
  },
  {
    id: 11,
    image: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Vì sao bữa sáng là bữa quan trọng nhất trong ngày?',
    date: '2023-10-10T16:10:00.000Z',
    description:
      'Theo nhiều nghiên cứu về sức khỏe, bữa sáng là thời điểm bạn cung cấp cho cơ thể những nguồn năng lượng & dưỡng chất cho hầu hết các hoạt động sẽ diễn ra trong ngày; hay nói cách khác, bữa sáng chiếm 15% - 25% tổng năng lượng bạn cần nạp mỗi ngày....',
  },
  {
    id: 12,
    image: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Vì sao bữa sáng là bữa quan trọng nhất trong ngày?',
    date: '2023-10-10T16:10:00.000Z',
    description:
      'Theo nhiều nghiên cứu về sức khỏe, bữa sáng là thời điểm bạn cung cấp cho cơ thể những nguồn năng lượng & dưỡng chất cho hầu hết các hoạt động sẽ diễn ra trong ngày; hay nói cách khác, bữa sáng chiếm 15% - 25% tổng năng lượng bạn cần nạp mỗi ngày....',
  },
];

const breadcrumbs = [
  { title: 'Home', to: '/' },
  { title: 'News', to: '/news' },
];

export default function News() {
  return (
    <Container maxWidth="lg">
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
