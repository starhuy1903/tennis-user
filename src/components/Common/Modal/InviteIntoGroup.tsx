import { Box, FormControl, FormHelperText, FormLabel, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAddMemberMutation } from 'store/api/group/groupApiSlice';
import { InvitationPayload } from 'types/group';
import { showSuccess } from 'utils/toast';

import BaseModal from './BaseModal';
import { InviteIntoGroupProps } from './types';

export default function InviteIntoGroup({ groupId, onModalClose }: InviteIntoGroupProps) {
  const [requestAddMember, { isLoading }] = useAddMemberMutation();
  const { handleSubmit, register, formState } = useForm<InvitationPayload>({
    mode: 'onTouched',
    defaultValues: {
      groupId,
      email: '',
    },
  });

  const { errors: formError } = formState;

  const onSubmit: SubmitHandler<InvitationPayload> = async (data) => {
    try {
      await requestAddMember(data).unwrap();
      showSuccess('Sent an invitation to join group via email successfully.');
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
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
      >
        <FormControl
          fullWidth
          error={!!formError.email}
        >
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            {...register('email', {
              required: 'The email is required.',
            })}
            required
            id="email"
            error={!!formError.email}
            aria-describedby="email-helper-text"
          />
          <FormHelperText id="email-helper-text">{formError.email?.message}</FormHelperText>
        </FormControl>{' '}
      </Box>
    );
  };

  return (
    <BaseModal
      headerText="Invite user"
      onModalClose={onModalClose}
      body={renderBody()}
      primaryButtonText="Invite"
      onClickPrimaryButton={handleSubmit(onSubmit)}
      disabledPrimaryButton={isLoading}
    />
  );
}
