import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Fab, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CenterLoading from 'components/Common/CenterLoading';
import { ImageListField, ReadOnlyTextField } from 'components/Common/FormComponents';
import { DetailWrapper } from 'components/Common/Layout/AdminLayout/ScreenWrapper';
import { FormatDateTime } from 'constants/datetime';
import { useDeleteNewsAdminMutation, useLazyGetNewsByIdAdminQuery } from 'store/api/admin/newsApiSlice';
import { News } from 'types/news';
import { displayDateTime } from 'utils/datetime';
import { showSuccess } from 'utils/toast';

export default function AdminNewsDetails() {
  const navigate = useNavigate();
  const confirm = useConfirm();

  const [news, setNews] = useState<News | null>(null);
  const { id } = useParams<{ id: string }>();

  const [getNews, { isLoading }] = useLazyGetNewsByIdAdminQuery();

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

  const [deleteNews] = useDeleteNewsAdminMutation();

  const handleDeleteNews = useCallback(() => {
    if (!news) {
      return;
    }
    confirm({
      title: 'Confirm delete news',
      description: `Are you sure you want to delete "${news.title}" news? This action cannot be undone.`,
      confirmationText: 'Delete',
      confirmationButtonProps: {
        color: 'error',
      },
    }).then(async () => {
      try {
        await deleteNews(news!.id).unwrap();

        showSuccess('Deleted post successfully.');

        navigate('/news', { replace: true });
      } catch (error) {
        // handled error
      }
    });
  }, [confirm, deleteNews, navigate, news]);

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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Edit">
            <Fab
              color="primary"
              aria-label="edit"
              size="small"
              onClick={() => {
                navigate(`/news/${news.id}/edit`);
              }}
            >
              <EditIcon />
            </Fab>
          </Tooltip>
          <Tooltip title="Delete">
            <Fab
              color="error"
              aria-label="delete"
              size="small"
              onClick={handleDeleteNews}
            >
              <DeleteIcon />
            </Fab>
          </Tooltip>
        </Box>
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
        images={[news?.image ?? '']}
      />
    </DetailWrapper>
  );
}
