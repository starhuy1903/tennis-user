import { Box, Button, FormControl, FormHelperText, FormLabel, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useChangePasswordMutation } from 'store/api/userApiSlice';
import { ChangePasswordPayload } from 'types/user';
import { showSuccess } from 'utils/toast';

type FormType = ChangePasswordPayload & {
  confirmPassword: string;
};

export default function ChangePassword() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<FormType>({
    mode: 'onChange',
  });
  const formValue = watch();

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    const { confirmPassword, ...submitData } = data;
    await changePassword(submitData).unwrap();

    showSuccess('Changed password successfully');
    navigate('/profile');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: 300,
      }}
    >
      <FormControl error={!!errors.oldPassword}>
        <FormLabel htmlFor="oldPassword">Current password</FormLabel>
        <TextField
          {...register('oldPassword', {
            required: 'Current password is required!',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters!',
            },
            maxLength: {
              value: 20,
              message: 'Password must be at most 20 characters!',
            },
          })}
          type="password"
          id="oldPassword"
          error={!!errors.oldPassword}
          aria-describedby="oldPassword-helper-text"
          disabled={isLoading}
          size="small"
        />
        <FormHelperText id="oldPassword-helper-text">{errors.oldPassword?.message}</FormHelperText>
      </FormControl>

      <FormControl error={!!errors.newPassword}>
        <FormLabel htmlFor="newPassword">New password</FormLabel>
        <TextField
          {...register('newPassword', {
            required: 'New password is required!',
            minLength: {
              value: 6,
              message: 'New password must be at least 6 characters!',
            },
            maxLength: {
              value: 20,
              message: 'New password must be at most 20 characters!',
            },
            validate: {
              hasNumber: (value) => /\d/.test(value) || 'Password must contain a number!',
              hasUppercase: (value) => /[A-Z]/.test(value) || 'Password must contain an uppercase letter!',
              hasLowercase: (value) => /[a-z]/.test(value) || 'Password must contain a lowercase letter!',
            },
          })}
          type="password"
          id="newPassword"
          error={!!errors.newPassword}
          aria-describedby="newPassword-helper-text"
          disabled={isLoading}
          size="small"
        />
        <FormHelperText id="newPassword-helper-text">{errors.newPassword?.message}</FormHelperText>
      </FormControl>

      <FormControl error={!!errors.confirmPassword}>
        <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
        <TextField
          {...register('confirmPassword', {
            required: 'Confirm password is required!',
            validate: (value) => value === formValue.newPassword || `Password confirmation doesn't match!`,
          })}
          type="password"
          id="confirmPassword"
          error={!!errors.confirmPassword}
          aria-describedby="confirmPassword-helper-text"
          disabled={isLoading}
          size="small"
        />
        <FormHelperText id="confirmPassword-helper-text">{errors.confirmPassword?.message}</FormHelperText>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        disabled={isLoading}
        onClick={handleSubmit(onSubmit)}
        sx={{ mt: 2, color: 'white' }}
      >
        Change password
      </Button>

      {/* <DevTool control={control} /> */}
    </Box>
  );
}
