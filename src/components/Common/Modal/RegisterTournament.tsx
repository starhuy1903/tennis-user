import { Box, FormControl, FormHelperText, FormLabel, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppSelector } from 'store';

import { useCreateTournamentRegistrationMutation } from 'store/api/tournament/tournamentRegistrationApiSlice';
import { showSuccess } from 'utils/toast';

import BaseModal from './BaseModal';

interface RegisterTournamentProps {
  tournamentId: number;
  onModalClose: () => void;
}

type FormType = {
  registrationMessage: string;
};

export default function RegisterTournament({ tournamentId, onModalClose }: RegisterTournamentProps) {
  const userId = useAppSelector((state) => state.user.profile?.id);

  const [createTournamentRegistration, { isLoading }] = useCreateTournamentRegistrationMutation();

  const { handleSubmit, register, formState } = useForm<FormType>({
    mode: 'onTouched',
    defaultValues: {
      registrationMessage: '',
    },
  });

  const { errors: formError } = formState;

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    try {
      await createTournamentRegistration({
        tournamentId,
        userId: userId!,
        registrationMessage: data.registrationMessage,
      }).unwrap();

      showSuccess('Sent tournament registration request successfully!');
      onModalClose();
    } catch (error) {
      // handled error
    }
  };

  const renderBody = () => {
    return (
      <Box
        component="form"
        autoComplete="off"
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        <FormControl
          fullWidth
          error={!!formError.registrationMessage}
        >
          <FormLabel htmlFor="regitrationMessage">Registration message</FormLabel>
          <TextField
            {...register('registrationMessage', {
              required: 'The registration message is required.',
            })}
            required
            id="registrationMessage"
            error={!!formError.registrationMessage}
            aria-describedby="regitrationMessage-helper-text"
            multiline
            rows={3}
            placeholder="Enter your registration message here"
          />
          <FormHelperText id="regitrationMessage-helper-text">{formError.registrationMessage?.message}</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  return (
    <BaseModal
      headerText="Register Tournament"
      onModalClose={onModalClose}
      body={renderBody()}
      primaryButtonText="Continue"
      onClickPrimaryButton={handleSubmit(onSubmit)}
      disabledPrimaryButton={isLoading}
    />
  );
}
