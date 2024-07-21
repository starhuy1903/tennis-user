import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PeopleIcon from '@mui/icons-material/People';
import { Box, FormControl, FormHelperText, FormLabel, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppSelector } from 'store';

import { ParticipantType, TournamentFormatOptions, TournamentStatus } from 'constants/tournament';
import { useApplyTournamentMutation } from 'store/api/tournament/participant/participant';
import { checkExpiredDate, displayDayLeft } from 'utils/datetime';
import { showSuccess } from 'utils/toast';

import BaseModal from './BaseModal';
import { RegisterTournamentProps } from './types';

type FormType = {
  name: string;
  message: string;
  user2Email?: string;
};

export default function RegisterTournament({ tournament, onSuccess, onModalClose }: RegisterTournamentProps) {
  const name = useAppSelector((state) => state.user.userInfo?.name);
  const isSingleType = tournament.participantType === ParticipantType.SINGLE;

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
        tournamentId: tournament.id,
        message: data.message,
        user2Email: !isSingleType ? data.user2Email : undefined,
      }).unwrap();

      showSuccess('Sent tournament registration request successfully.');
      onModalClose();
      onSuccess?.();
    } catch (err) {
      console.error(err);
    }
  };

  const renderTournamentInfo = () => {
    return (
      <Box>
        <Stack
          direction="row"
          gap={2}
        >
          <img
            src={tournament.image}
            alt="tournament image"
            style={{ height: 130, borderRadius: 8 }}
          />
          <Stack>
            <Tooltip title={tournament.name}>
              <Typography
                variant="h6"
                fontWeight="bold"
                noWrap
                gutterBottom
              >
                {tournament.name}
              </Typography>
            </Tooltip>
            <Box
              display="flex"
              alignItems="center"
              gap={1}
            >
              <Tooltip
                title="Format"
                placement="left"
              >
                <EmojiEventsIcon
                  sx={{
                    color: 'gray',
                  }}
                />
              </Tooltip>
              <Typography variant="subtitle1">{TournamentFormatOptions[tournament.format]}</Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              gap={1}
            >
              <PeopleIcon
                sx={{
                  color: 'gray',
                }}
              />
              <Typography variant="subtitle1">{`${tournament.participants}/${tournament.maxParticipants} participants`}</Typography>
            </Box>

            {tournament.status === TournamentStatus.UPCOMING && (
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                color="red"
              >
                <AccessTimeIcon />
                <Typography variant="subtitle1">
                  {checkExpiredDate(tournament.registrationDueDate)
                    ? 'Registration has expired'
                    : displayDayLeft(tournament.registrationDueDate)}
                </Typography>
              </Box>
            )}
          </Stack>
        </Stack>
      </Box>
    );
  };

  const renderBody = () => {
    if (isSingleType) {
      return (
        <Stack
          component="form"
          autoComplete="off"
          gap={2}
        >
          {renderTournamentInfo()}
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
        </Stack>
      );
    }

    return (
      <Box
        component="form"
        autoComplete="off"
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        {renderTournamentInfo()}

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
