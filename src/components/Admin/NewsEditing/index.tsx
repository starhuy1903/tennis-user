import SaveIcon from '@mui/icons-material/Save';
import { Button, FormControl, FormHelperText, FormLabel, Stack, TextField, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import CenterLoading from 'components/Common/CenterLoading';
import { ReadOnlyTextField } from 'components/Common/FormComponents';
import SingleImagePicker from 'components/Common/Input/SingleImagePicker';
import { DetailWrapper } from 'components/Common/Layout/AdminLayout/ScreenWrapper';
import { FormatDateTime } from 'constants/datetime';
import { useLazyGetNewsByIdAdminQuery, useUpdateNewsAdminMutation } from 'store/api/admin/newsApiSlice';
import { News, UpdateNewsDto } from 'types/news';
import { displayDateTime } from 'utils/datetime';
import { showError, showSuccess } from 'utils/toast';

export default function NewsEditing() {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const [news, setNews] = useState<News | null>(null);

  const [getNews, { isLoading }] = useLazyGetNewsByIdAdminQuery();

  const { handleSubmit, register, formState, setValue, watch, reset } = useForm<UpdateNewsDto>({
    mode: 'onChange',
  });

  const handleInvalidRequest = useCallback(() => {
    setNews(null);
    navigate('/panels', { replace: true });
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

        reset({
          title: res.title,
          author: res.author,
          description: res.description,
          content: res.content,
          image: res.image,
        });
      } catch (error) {
        console.log(error);
        handleInvalidRequest();
      }
    })();
  }, [getNews, handleInvalidRequest, id, reset]);

  const { errors: formError } = formState;
  const formValue = watch();

  const [updateNews, { isLoading: isSubmitting }] = useUpdateNewsAdminMutation();

  const onSubmit = async (data: UpdateNewsDto) => {
    try {
      await updateNews({
        id: news!.id,
        ...data,
      }).unwrap();

      showSuccess('Edited news successfully');
      navigate(`/news/${id}`, { replace: true });
    } catch (error) {
      console.log(error);
      showError('Failed to edit news');
    }
  };

  if (isLoading || !news) {
    return <CenterLoading />;
  }

  return (
    <DetailWrapper label="Update News">
      <Typography
        variant="h6"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        News Details
        <Button
          startIcon={<SaveIcon />}
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
          sx={{ mt: 2, color: 'white' }}
        >
          Save
        </Button>
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
          disabled
        />

        <ReadOnlyTextField
          label="Created Time"
          value={displayDateTime({
            dateTime: news.createdAt,
            targetFormat: FormatDateTime.DATE_AND_FULL_TIME,
          })}
          disabled
        />

        <ReadOnlyTextField
          label="Updated Time"
          value={displayDateTime({
            dateTime: news.updatedAt,
            targetFormat: FormatDateTime.DATE_AND_FULL_TIME,
          })}
          disabled
        />
      </Stack>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
      >
        <FormControl
          sx={{
            width: '70%',
          }}
          error={!!formError.title}
        >
          <FormLabel htmlFor="title">Title</FormLabel>
          <TextField
            {...register('title', {
              required: 'The title is required.',
            })}
            id="title"
            error={!!formError.title}
            aria-describedby="title-helper-text"
          />
          <FormHelperText id="title-helper-text">{formError.title?.message}</FormHelperText>
        </FormControl>

        <FormControl
          sx={{
            width: '30%',
          }}
          error={!!formError.author}
        >
          <FormLabel htmlFor="author">Author</FormLabel>
          <TextField
            {...register('author', {
              required: 'The author is required.',
            })}
            id="author"
            error={!!formError.author}
            aria-describedby="author-helper-text"
          />
          <FormHelperText id="author-helper-text">{formError.author?.message}</FormHelperText>
        </FormControl>
      </Stack>

      <FormControl
        fullWidth
        error={!!formError.description}
      >
        <FormLabel htmlFor="description">Description</FormLabel>
        <TextField
          {...register('description', {
            required: 'The description is required.',
          })}
          id="description"
          multiline
          rows={4}
          error={!!formError.description}
          aria-describedby="description-helper-text"
        />
        <FormHelperText id="description-helper-text">{formError.description?.message}</FormHelperText>
      </FormControl>

      <FormControl
        fullWidth
        error={!!formError.content}
      >
        <FormLabel htmlFor="content">Content</FormLabel>
        <TextField
          {...register('content', {
            required: 'The content is required.',
          })}
          id="content"
          multiline
          rows={4}
          error={!!formError.content}
          aria-describedby="content-helper-text"
        />
        <FormHelperText id="content-helper-text">{formError.content?.message}</FormHelperText>
      </FormControl>

      <SingleImagePicker
        label="Avatar"
        imageUrl={formValue.image}
        handleUpload={(value) => {
          setValue('image', value);
        }}
        handleRemove={() => {
          setValue('image', '');
        }}
      />
    </DetailWrapper>
  );
}
