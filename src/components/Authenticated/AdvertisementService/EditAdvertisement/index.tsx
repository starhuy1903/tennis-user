import { Box, Button, FormControl, FormHelperText, FormLabel, Paper, TextField, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'store';

import { Breadcrumbs } from 'components/Common/Breadcrumb';
import CenterLoading from 'components/Common/CenterLoading';
import SingleImagePicker from 'components/Common/Input/SingleImagePicker';
import { AdvertisementStatus } from 'constants/advertisement';
import {
  useEditAdvertisementMutation,
  useLazyGetAdvertisementByIdQuery,
} from 'store/api/advertisement/advertisementApiSlice';
import { selectUser } from 'store/slice/userSlice';
import { Advertisement, AdvertisementPayload } from 'types/advertisement';
import { showError, showSuccess } from 'utils/toast';

type FormType = Omit<AdvertisementPayload, 'purchasedPackageId'>;

export default function EditAdvertisement() {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const [advertisement, setAdvertisement] = useState<Advertisement | null>(null);
  const { id: advertisementId } = useParams<{ id: string }>();
  const [getAdvertisement, { isLoading: loadingAdvertisement }] = useLazyGetAdvertisementByIdQuery();
  const [editAdvertisement, { isLoading }] = useEditAdvertisementMutation();

  const { handleSubmit, register, control, formState, reset } = useForm<FormType>({
    mode: 'onTouched',
  });

  const { errors: formError } = formState;

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    try {
      if (!advertisement || !advertisementId) {
        showError('Advertisement not found.');
        return;
      }

      if (
        data.title === advertisement?.title &&
        data.content === advertisement?.content &&
        data.website === advertisement?.website &&
        data.image === advertisement?.image
      ) {
        showError('Your advertisement has not been changed.');
        return;
      }

      const res = await editAdvertisement({
        id: advertisementId,
        ...data,
      }).unwrap();
      showSuccess('Updated advertisement successfully.');
      navigate(`/affiliates/my-ads/${res.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!advertisementId) {
      navigate('/my-ads');
      return;
    }

    (async () => {
      try {
        const res = await getAdvertisement(advertisementId).unwrap();

        if (!user || !res || res.userId !== user.id || res.status === AdvertisementStatus.REJECTED) {
          navigate('/my-ads');
          return;
        }

        setAdvertisement(res);
        reset({
          title: res.title,
          content: res.content,
          website: res.website,
          image: res.image,
        });
      } catch (error) {
        navigate('/my-ads');
        return;
      }
    })();
  }, [advertisementId, getAdvertisement, navigate, reset, user]);

  const customRoutes = useMemo(
    () => [
      {
        path: '/affiliates/my-ads',
        breadcrumb: 'My Advertisements',
      },
      {
        path: '/affiliates/my-ads/:id',
        breadcrumb: advertisement?.title,
      },
    ],
    [advertisement?.title]
  );

  if (loadingAdvertisement || !advertisement) {
    return <CenterLoading />;
  }

  return (
    <Box
      sx={{
        mb: 8,
      }}
    >
      <Breadcrumbs customRoutes={customRoutes} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          sx={{
            padding: 4,
            borderRadius: 2,
            backgroundColor: 'white',
            minWidth: 600,
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 500,
              textAlign: 'center',
            }}
          >
            Edit Advertisement
          </Typography>

          <Box
            component="form"
            autoComplete="off"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
          >
            <FormControl
              fullWidth
              error={!!formError.title}
            >
              <FormLabel htmlFor="title">Title</FormLabel>
              <TextField
                {...register('title', {
                  required: 'The title is required.',
                  minLength: {
                    value: 3,
                    message: 'The title must be at least 3 characters.',
                  },
                })}
                required
                id="title"
                error={!!formError.title}
                aria-describedby="title-helper-text"
                placeholder="Title"
                size="small"
              />
              <FormHelperText id="title-helper-text">{formError.title?.message}</FormHelperText>
            </FormControl>

            <FormControl
              fullWidth
              error={!!formError.content}
            >
              <FormLabel>Content</FormLabel>
              <TextField
                {...register('content', {
                  required: 'The content is required.',
                  minLength: {
                    value: 20,
                    message: 'The content must be at least 20 characters.',
                  },
                })}
                id="content"
                error={!!formError.content}
                aria-describedby="content-helper-text"
                multiline
                rows={5}
                placeholder="Say something about your advertisement"
                size="small"
              />
              <FormHelperText id="content-helper-text">{formError.content?.message}</FormHelperText>
            </FormControl>

            <FormControl
              fullWidth
              error={!!formError.website}
            >
              <FormLabel htmlFor="website">Website</FormLabel>
              <TextField
                placeholder="Website"
                id="website"
                error={!!formError.website}
                aria-describedby="website-helper-text"
                size="small"
              />
              <FormHelperText id="website-helper-text">{formError.website?.message}</FormHelperText>
            </FormControl>

            <Controller
              name="image"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <SingleImagePicker
                  label="Upload a background image for your advertisement"
                  imageUrl={value}
                  handleUpload={onChange}
                  handleRemove={() => {
                    onChange('');
                  }}
                  isCrop={false}
                />
              )}
            />

            <Button
              variant="contained"
              color="primary"
              disabled={isLoading}
              onClick={handleSubmit(onSubmit)}
              sx={{ mt: 4 }}
            >
              Save
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
