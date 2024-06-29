import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { APP_BACKGROUND_URL } from 'constants/app';
import { useResetPasswordMutation } from 'store/api/userApiSlice';
import { ResetPasswordPayload } from 'types/user';
import { showSuccess } from 'utils/toast';

type FormType = ResetPasswordPayload & {
  confirmPassword: string;
};

export default function ResetPassword() {
  const navigate = useNavigate();
  const theme = useTheme();

  const [urlParams] = useSearchParams();
  const verifyToken = urlParams.get('token');

  const [requestResetPassword, { isLoading }] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors: formError },
    watch,
  } = useForm<FormType>();
  const formValue = watch();

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    if (!verifyToken) {
      return;
    }

    try {
      await requestResetPassword({
        newPassword: data.newPassword,
        verifyToken,
      }).unwrap();

      showSuccess('Reset password successfully! Please login with your new password.');
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!verifyToken) {
      navigate('/login');
      return;
    }
  }, [navigate, verifyToken]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: `calc(100dvh - ${theme.layout.headerHeight})`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        component="img"
        sx={{
          position: 'absolute',
          width: '100vw',
          height: '100%',
          filter: 'brightness(0.6)',
        }}
        src={APP_BACKGROUND_URL}
        alt="login"
      />

      <Box
        component="form"
        autoComplete="off"
        sx={{
          position: 'relative',
          minWidth: 400,
          maxWidth: 450,
          px: 6,
          py: 4,
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 2,
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
          Reset Password
        </Typography>

        <Typography
          variant="subtitle2"
          sx={{
            color: 'gray',
            textAlign: 'center',
          }}
        >
          Enter a new password to reset your password.
        </Typography>

        <Stack
          direction="column"
          spacing={2}
          mt={2}
        >
          <FormControl
            fullWidth
            error={!!formError.newPassword}
          >
            <FormLabel htmlFor="newPassword">Password</FormLabel>
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
                  hasNumber: (value) => /\d/.test(value) || 'New password must contain a number!',
                  hasUppercase: (value) => /[A-Z]/.test(value) || 'New password must contain an uppercase letter!',
                  hasLowercase: (value) => /[a-z]/.test(value) || 'New password must contain a lowercase letter!',
                },
              })}
              id="newPassword"
              type="password"
              placeholder="Enter your new password"
              error={!!formError.newPassword}
              aria-describedby="newPassword-helper-text"
              size="small"
              disabled={isLoading}
            />
            <FormHelperText id="password-helper-text">{formError.newPassword?.message}</FormHelperText>
          </FormControl>

          <FormControl
            fullWidth
            error={!!formError.confirmPassword}
          >
            <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
            <TextField
              {...register('confirmPassword', {
                required: 'Confirm password is required!',
                validate: (value) => value === formValue.newPassword || `Password confirmation doesn't match!`,
              })}
              id="confirmPassword"
              type="password"
              placeholder="Enter your confirm password"
              error={!!formError.confirmPassword}
              aria-describedby="confirmPassword-helper-text"
              size="small"
              sx={{
                backgroundColor: 'white',
              }}
              disabled={isLoading}
            />
            <FormHelperText id="confirmPassword-helper-text">{formError.confirmPassword?.message}</FormHelperText>
          </FormControl>
        </Stack>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
          sx={{ mt: 4, color: 'white', width: '100%' }}
        >
          {isLoading ? 'Loading ...' : 'Continue'}
        </Button>
      </Box>
    </Box>
  );
}
