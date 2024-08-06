import { Box, FormControl, FormHelperText, FormLabel, TextField } from '@mui/material';
import EmailValidator from 'email-validator';
import { useForm } from 'react-hook-form';

import { useAddRefereeMutation } from 'store/api/tournament/creator/participant';
import { showSuccess } from 'utils/toast';

import BaseModal from '../BaseModal';
import { AddRefereeProps } from '../types';

type FormType = {
  email: string;
};

export default function AddReferee({ tournamentId, onSubmit, onModalClose }: AddRefereeProps) {
  const [addRefereeRequest, { isLoading: addingReferee }] = useAddRefereeMutation();

  const { handleSubmit, register, formState } = useForm<FormType>({
    mode: 'onTouched',
    defaultValues: {
      email: '',
    },
  });

  const { errors: formError } = formState;

  const handleAddReferee = handleSubmit(async (data) => {
    try {
      await addRefereeRequest({ ...data, tournamentId }).unwrap();
      showSuccess('Added referee to your tournament successfully.');
      onSubmit();
      onModalClose();
    } catch (error) {
      // handled error
    }
  });

  const renderBody = () => {
    return (
      <Box
        component="form"
        autoComplete="off"
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
        onSubmit={(e) => e.preventDefault()}
      >
        <FormControl
          fullWidth
          error={!!formError.email}
        >
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            {...register('email', {
              required: 'The email is required.',
              validate: (value) => EmailValidator.validate(value) || 'Invalid email format.',
            })}
            required
            id="email"
            error={!!formError.email}
            aria-describedby="email-helper-text"
          />
          <FormHelperText id="email-helper-text">{formError.email?.message}</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  return (
    <BaseModal
      headerText="Add referee"
      onModalClose={onModalClose}
      body={renderBody()}
      primaryButtonText="Add"
      onClickPrimaryButton={handleAddReferee}
      disabledPrimaryButton={addingReferee}
      disabledSecondaryButton={addingReferee}
    />
  );
}
