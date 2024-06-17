import { Box, FormControl, FormHelperText, FormLabel, TextField } from '@mui/material';
import EmailValidator from 'email-validator';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppSelector } from 'store';

import { useInviteMemberMutation } from 'store/api/group/groupApiSlice';
import { selectUser } from 'store/slice/userSlice';
import { InvitationPayload } from 'types/group';
import { showSuccess } from 'utils/toast';

import BaseModal from './BaseModal';
import { InviteIntoGroupProps } from './types';

export default function InviteIntoGroup({ groupId, onModalClose }: InviteIntoGroupProps) {
  const user = useAppSelector(selectUser);

  const [requestInviteMember, { isLoading }] = useInviteMemberMutation();
  const { handleSubmit, register, formState } = useForm<InvitationPayload>({
    mode: 'onTouched',
    defaultValues: {
      groupId,
      email: '',
      hostName: user?.name,
    },
  });

  const { errors: formError } = formState;

  const onSubmit: SubmitHandler<InvitationPayload> = async (data) => {
    try {
      await requestInviteMember(data).unwrap();
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
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        onSubmit={handleSubmit(onSubmit)}
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
      headerText="Invite user"
      onModalClose={onModalClose}
      body={renderBody()}
      primaryButtonText="Invite"
      onClickPrimaryButton={handleSubmit(onSubmit)}
      disabledPrimaryButton={isLoading}
    />
  );
}
