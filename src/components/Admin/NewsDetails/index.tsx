import { Stack, TextField, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CenterLoading from 'components/Common/CenterLoading';
import { ImageListField, ReadOnlyTextField } from 'components/Common/FormComponents';
import { DetailWrapper } from 'components/Common/Layout/AdminLayout/ScreenWrapper';
import { FormatDateTime } from 'constants/datetime';
import { useLazyGetNewsByIdQuery } from 'store/api/unauthenticated/newsApiSlice';
import { News } from 'types/news';
import { displayDateTime } from 'utils/datetime';

export default function AdminNewsDetails() {
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

    (async () => {
      try {
        const res = await getNews(id!).unwrap();
        setNews(res);
      } catch (error) {
        console.log(error);
        handleInvalidRequest();
      }
    })();
  }, [getNews, handleInvalidRequest, id]);

  if (isLoading || !news) {
    return <CenterLoading />;
  }

  return (
    <DetailWrapper label={news.title}>
      <Typography
        variant="h6"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        News Details
      </Typography>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          mb: 1,
        }}
      >
        <ReadOnlyTextField
          label="ID"
          value={news.id}
        />

        <ReadOnlyTextField
          label="Created Time"
          value={displayDateTime({
            dateTime: news.createdAt,
            targetFormat: FormatDateTime.DATE_AND_FULL_TIME,
          })}
        />

        <ReadOnlyTextField
          label="Updated Time"
          value={displayDateTime({
            dateTime: news.updatedAt,
            targetFormat: FormatDateTime.DATE_AND_FULL_TIME,
          })}
        />
      </Stack>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          mb: 1,
        }}
      >
        <TextField
          label="Title"
          sx={{
            width: '70%',
          }}
          InputProps={{
            readOnly: true,
          }}
          value={news.title}
        />

        <TextField
          label="Author"
          sx={{
            width: '30%',
          }}
          InputProps={{
            readOnly: true,
          }}
          value={news.author}
        />
      </Stack>

      <TextField
        label="Description"
        value={news.description}
        multiline
        rows={4}
        fullWidth
        InputProps={{
          readOnly: true,
        }}
      />

      <TextField
        label="Content"
        value={news.content}
        multiline
        rows={4}
        fullWidth
        InputProps={{
          readOnly: true,
        }}
      />

      <ImageListField
        label="Image"
        images={[news?.image]}
      />
    </DetailWrapper>
  );
}
