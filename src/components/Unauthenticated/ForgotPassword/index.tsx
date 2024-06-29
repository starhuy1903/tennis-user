import { Box, Button, FormControl, FormHelperText, FormLabel, TextField, Typography, useTheme } from '@mui/material';
import * as EmailValidator from 'email-validator';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Status from 'components/Common/Status';
import { APP_BACKGROUND_URL } from 'constants/app';
import { useForgotPasswordMutation } from 'store/api/userApiSlice';
import { ForgotPasswordPayload } from 'types/user';

export default function ForgotPassword() {
  const theme = useTheme();

  const [requestForgetPassword, { isLoading }] = useForgotPasswordMutation();
  const [isSent, setIsSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors: formError },
  } = useForm<ForgotPasswordPayload>();

  const onSubmit: SubmitHandler<ForgotPasswordPayload> = async (data) => {
    try {
      await requestForgetPassword(data).unwrap();
      setIsSent(true);
    } catch (error) {
      console.error(error);
    }
  };

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

      {!isSent ? (
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
            Find your account
          </Typography>

          <Typography
            variant="subtitle2"
            sx={{
              color: 'gray',
              textAlign: 'center',
            }}
          >
            Please enter your email address to reset your account.
          </Typography>

          <FormControl
            fullWidth
            error={!!formError.email}
            sx={{
              mt: 2,
            }}
          >
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              {...register('email', {
                required: 'Email is required!',
                validate: (value) => EmailValidator.validate(value) || 'Invalid email address!',
              })}
              id="email"
              placeholder="Enter your email"
              error={!!formError.email}
              aria-describedby="email-helper-text"
              size="small"
              disabled={isLoading}
            />
            <FormHelperText id="email-helper-text">{formError.email?.message}</FormHelperText>
          </FormControl>

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
      ) : (
        <Box
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
          <Status
            status="success"
            title="Check your email"
            height="auto"
            description="Please check your email for a password reset link. If have any questions, please visit our support page for more help."
          />
        </Box>
      )}
    </Box>
  );
}
