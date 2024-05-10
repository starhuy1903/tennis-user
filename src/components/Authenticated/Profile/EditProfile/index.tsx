import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store';

import SingleImagePicker from 'components/Common/Input/SingleImagePicker';
import { GenderOptions } from 'constants/tournament';
import { useEditProfileMutation } from 'store/api/userApiSlice';
import { UserProfile } from 'types/user';
import { showError, showSuccess } from 'utils/toast';

type FormType = Omit<UserProfile, 'id' | 'email' | 'elo'> & {
  image: string;
};

export default function EditProfile() {
  const navigate = useNavigate();
  const userInfo = useAppSelector((state) => state.user.userInfo);

  const [editProfile, { isLoading }] = useEditProfileMutation();

  const { handleSubmit, register, control, formState, setValue, watch } = useForm<FormType>({
    mode: 'onTouched',
    defaultValues: {
      name: userInfo?.name,
      phoneNumber: userInfo?.phoneNumber,
      dob: userInfo?.dob,
      gender: userInfo?.gender,
      image: userInfo?.image,
    },
  });

  const { errors: formError } = formState;
  const formValue = watch();

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    try {
      if (
        data.name === userInfo?.name &&
        data.dob === userInfo?.dob &&
        data.phoneNumber === userInfo?.phoneNumber &&
        data.gender === userInfo?.gender &&
        data.image === userInfo?.image
      ) {
        showError('Your profile has not been changed.');
        return;
      }

      await editProfile(data).unwrap();
      showSuccess('Updated profile successfully.');
      navigate('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        minWidth: '500px',
        my: 2,
      }}
    >
      <Paper sx={{ padding: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          Edit Profile
        </Typography>

        <Box
          component="form"
          autoComplete="off"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
        >
          <FormControl
            fullWidth
            error={!!formError.name}
          >
            <FormLabel htmlFor="name">Name</FormLabel>
            <TextField
              {...register('name', {
                required: 'The company name is required.',
                minLength: {
                  value: 3,
                  message: 'The name must be at least 3 characters.',
                },
              })}
              required
              id="name"
              error={!!formError.name}
              aria-describedby="name-helper-text"
              placeholder="Tournament name"
            />
            <FormHelperText id="name-helper-text">{formError.name?.message}</FormHelperText>
          </FormControl>

          <Stack
            direction="row"
            spacing={4}
          >
            <Controller
              control={control}
              name="dob"
              rules={{
                required: 'The date of birth is required.',
              }}
              render={({ field: { onChange } }) => (
                <FormControl
                  fullWidth
                  error={!!formError.dob}
                >
                  <FormLabel htmlFor="dob">Date of birth</FormLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      onChange={(date) => {
                        onChange(date?.toISOString());
                      }}
                      defaultValue={dayjs(formValue.dob)}
                      format="DD/MM/YYYY"
                    />
                  </LocalizationProvider>
                  <FormHelperText id="dob-helper-text">{formError.dob?.message}</FormHelperText>
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name="gender"
              rules={{ required: 'Please select a gender.' }}
              render={({ field: { onChange, value } }) => (
                <FormControl
                  fullWidth
                  error={!!formError.gender}
                >
                  <FormLabel htmlFor="gender">Gender</FormLabel>
                  <Select
                    value={value}
                    id="gender"
                    onChange={onChange}
                    aria-describedby="gender-helper-text"
                  >
                    {Object.entries(GenderOptions).map(([genderKey, genderValue], index) => (
                      <MenuItem
                        key={index}
                        value={genderKey}
                      >
                        {genderValue}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText id="gender-helper-text">{formError.gender?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Stack>

          <FormControl fullWidth>
            <FormLabel htmlFor="email">Contact email</FormLabel>
            <TextField
              value={userInfo?.email}
              disabled
              id="email"
              aria-describedby="email-helper-text"
            />
          </FormControl>

          <FormControl
            fullWidth
            error={!!formError.phoneNumber}
          >
            <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
            <TextField
              {...register('phoneNumber', {
                required: 'The phone number is required.',
                minLength: {
                  value: 8,
                  message: 'The phone number must be at least 8 characters.',
                },
                validate: (value) => !isNaN(Number(value)) || 'The phone number must be a number.',
              })}
              placeholder="0987654321"
              required
              id="phoneNumber"
              error={!!formError.phoneNumber}
              aria-describedby="phoneNumber-helper-text"
            />
            <FormHelperText id="phoneNumber-helper-text">{formError.phoneNumber?.message}</FormHelperText>
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
    </Container>
  );
}
