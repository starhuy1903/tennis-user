// import { DevTool } from '@hookform/devtools';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  FormControl,
  FormHelperText,
  FormLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMemo } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import SingleImagePicker from 'components/Common/Input/SingleImagePicker';
import { ServiceLevel, ServiceLevelOptions } from 'constants/service';
import { useCreateAdvertisementMutation } from 'store/api/advertisement/advertisementApiSlice';
import { AdvertisementPayload } from 'types/advertisement';
import { UserPackage } from 'types/package';
import { displayTimestamp } from 'utils/datetime';
import { getUsedAdvertisementService } from 'utils/package';
import { showSuccess } from 'utils/toast';

type FormType = Omit<AdvertisementPayload, 'purchasedPackageId'>;

interface FormCreateProps {
  selectedPackage: UserPackage;
  setSelectedPackage: any;
}

export default function FormCreateAdvertisement({ selectedPackage, setSelectedPackage }: FormCreateProps) {
  const navigate = useNavigate();
  const [requestCreateAdvertisement, { isLoading }] = useCreateAdvertisementMutation();

  const usedService = useMemo(() => {
    return getUsedAdvertisementService(selectedPackage);
  }, [selectedPackage]);

  const { handleSubmit, register, control, formState } = useForm<FormType>({
    mode: 'onTouched',
    defaultValues: {
      title: '',
      content: '',
      image: '',
      website: '',
    },
  });

  const { errors: formError } = formState;

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    try {
      const submitData: AdvertisementPayload = {
        ...data,
        purchasedPackageId: selectedPackage.id,
      };

      const res = await requestCreateAdvertisement(submitData).unwrap();
      showSuccess('Created advertisement successfully');
      navigate(`/affiliates/my-ads/${res.id}`);
    } catch (error) {
      // handled error
    }
  };

  const handleGoPreviousStep = () => {
    setSelectedPackage(null);
  };

  return (
    <Paper
      elevation={1}
      sx={{
        padding: 4,
        borderRadius: 2,
        backgroundColor: 'white',
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
        Create Advertisement
      </Typography>

      <Card
        sx={{
          p: 2,
          mt: 2,
          backgroundImage: `url('https://cdn.shopify.com/s/files/1/0070/7032/files/package_f909e305-d702-4012-977f-9513452ed849.png?v=1708976749')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <CardHeader
          title={selectedPackage.name}
          titleTypographyProps={{ variant: 'h2', fontWeight: 'bold' }}
        />
        <CardContent>
          <Stack>
            <Box>
              <Typography
                display="inline"
                fontWeight="bold"
                marginRight="10px"
              >
                Level:
              </Typography>
              <Typography display="inline">
                <Chip
                  label={ServiceLevelOptions[usedService.level]}
                  color={usedService.level === ServiceLevel.BASIC ? 'info' : 'warning'}
                />
              </Typography>
            </Box>
            <Box>
              <Typography
                display="inline"
                fontWeight="bold"
                marginRight="10px"
              >
                Expired date:
              </Typography>
              <Typography display="inline">{displayTimestamp(selectedPackage.endDate)}</Typography>
            </Box>
          </Stack>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="info"
            onClick={handleGoPreviousStep}
          >
            Change package
          </Button>
        </CardActions>
      </Card>

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
            rows={3}
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
            {...register('website')}
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

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            disabled={isLoading}
            onClick={handleGoPreviousStep}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={isLoading}
            onClick={handleSubmit(onSubmit)}
          >
            Create Advertisement
          </Button>
        </Box>

        {/* <DevTool control={control} /> */}
      </Box>
    </Paper>
  );
}
