import { Box, FormControl, FormHelperText, FormLabel, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppSelector } from 'store';

import { ParticipantType } from 'constants/tournament';
import { useApplyTournamentMutation } from 'store/api/tournament/participant/participant';
import { showSuccess } from 'utils/toast';

import BaseModal from './BaseModal';
import { RegisterTournamentProps } from './types';

type FormType = {
  name: string;
  message: string;
  user2Email?: string;
};

export default function RegisterTournament({
  tournamentId,
  participantType,
  fetchMyApplication,
  onModalClose,
}: RegisterTournamentProps) {
  const name = useAppSelector((state) => state.user.userInfo?.name);
  const isSingleType = participantType === ParticipantType.SINGLE;

  const [createTournamentRegistration, { isLoading }] = useApplyTournamentMutation();

  const { handleSubmit, register, formState } = useForm<FormType>({
    mode: 'onTouched',
    defaultValues: {
      message: '',
      name: name || '',
    },
  });

  const { errors: formError } = formState;

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    try {
      await createTournamentRegistration({
        tournamentId,
        message: data.message,
        user2Email: !isSingleType ? data.user2Email : undefined,
      }).unwrap();

      showSuccess('Sent tournament registration request successfully.');
      fetchMyApplication();
      onModalClose();
    } catch (err) {
      console.error(err);
    }
  };

  const renderBody = () => {
    if (isSingleType) {
      return (
        <Box
          component="form"
          autoComplete="off"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <FormControl
            fullWidth
            error={!!formError.name}
          >
            <FormLabel htmlFor="name">Your name</FormLabel>
            <TextField
              {...register('name', {
                required: 'Your name is required.',
              })}
              required
              id="name"
              error={!!formError.name}
              aria-describedby="name-helper-text"
              placeholder="Enter your name here"
            />
            <FormHelperText id="name-helper-text">{formError.name?.message}</FormHelperText>
          </FormControl>

          <FormControl
            fullWidth
            error={!!formError.message}
          >
            <FormLabel htmlFor="message">Registration message</FormLabel>
            <TextField
              {...register('message', {
                required: 'The registration message is required.',
              })}
              required
              id="message"
              error={!!formError.message}
              aria-describedby="message-helper-text"
              multiline
              rows={3}
              placeholder="Enter your registration message here"
            />
            <FormHelperText id="message-helper-text">{formError.message?.message}</FormHelperText>
          </FormControl>
        </Box>
      );
    }

    return (
      <Box
        component="form"
        autoComplete="off"
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <FormControl
          fullWidth
          error={!!formError.name}
        >
          <FormLabel htmlFor="name">Your name</FormLabel>
          <TextField
            {...register('name', {
              required: 'Your name is required.',
            })}
            required
            id="name"
            error={!!formError.name}
            aria-describedby="name-helper-text"
            placeholder="Enter your name here"
          />
          <FormHelperText id="name-helper-text">{formError.name?.message}</FormHelperText>
        </FormControl>

        <FormControl
          fullWidth
          error={!!formError.user2Email}
        >
          <FormLabel htmlFor="user2Email">Your teammate's email</FormLabel>
          <TextField
            {...register('user2Email', {
              required: `Your teammate's email is required.`,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Invalid email format.',
              },
            })}
            required
            id="user2Email"
            error={!!formError.user2Email}
            aria-describedby="user2Email-helper-text"
            placeholder="Enter your teammate's email here"
          />
          <FormHelperText id="user2Email-helper-text">{formError.user2Email?.message}</FormHelperText>
        </FormControl>

        <FormControl
          fullWidth
          error={!!formError.message}
        >
          <FormLabel htmlFor="message">Registration message</FormLabel>
          <TextField
            {...register('message', {
              required: 'The registration message is required.',
            })}
            required
            id="message"
            error={!!formError.message}
            aria-describedby="message-helper-text"
            multiline
            rows={3}
            placeholder="Enter your registration message here"
          />
          <FormHelperText id="message-helper-text">{formError.message?.message}</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  return (
    <BaseModal
      headerText="Register Tournament"
      onModalClose={onModalClose}
      body={renderBody()}
      primaryButtonText="Apply"
      onClickPrimaryButton={handleSubmit(onSubmit)}
      disabledPrimaryButton={isLoading}
    />
  );
}
