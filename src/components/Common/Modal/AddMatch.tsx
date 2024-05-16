import { FormControl, FormHelperText, FormLabel, Stack, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useCreateMatchMutation } from 'store/api/fixture/matchApiSlice';
import { useGetOpenTournamentParticipantsQuery } from 'store/api/tournament/shared/participant';
import { OpenTournamentParticipant } from 'types/open-tournament-participants';
import { showSuccess } from 'utils/toast';

import CenterLoading from '../CenterLoading';
import BaseModal from './BaseModal';
import { AddMatchProps } from './types';

interface FormType {
  tournamentId: number;
  name: string;
  time: string;
  date: string;
  duration: number;
  team1: OpenTournamentParticipant;
  team2: OpenTournamentParticipant;
}

export default function AddMatch({ tournamentId, onModalClose }: AddMatchProps) {
  const [createMatchRequest, { isLoading: isAddMatchLoading }] = useCreateMatchMutation();
  const { data: participantData, isLoading: fetchingParticipants } = useGetOpenTournamentParticipantsQuery({
    tournamentId,
  });

  const { handleSubmit, control, formState, register, getValues } = useForm<FormType>({
    defaultValues: {
      tournamentId: tournamentId,
      name: '',
      time: dayjs().hour(8).minute(0).second(0).toISOString(),
      date: dayjs().toISOString(),
      duration: 30,
    },
  });

  const { errors: formError } = formState;

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    try {
      await createMatchRequest(data).unwrap();
      showSuccess('Match created successfully');
      onModalClose();
    } catch (error) {
      // handle error
    }
  };

  const renderBody = () => {
    if (fetchingParticipants) {
      return <CenterLoading />;
    }

    console.log({ participantData });

    return (
      <Stack
        component="form"
        spacing={2}
      >
        <Stack direction="row">
          {/* Team 1 */}
          {/* <Controller
            control={control}
            name="team1"
            // defaultValue={tournamentFormatOptions[0].value as TournamentFormat}
            render={({ field: { onChange, value } }) => (
              <FormControl
                fullWidth
                error={!!formError.team1}
              >
                
                <Select
                  value={value}
                  id="team1"
                  onChange={onChange}
                  aria-describedby="team1-helper-text"
                >
                  {participantData?.data.map((participant) => (
                    <MenuItem
                      key={participant.}
                      value={tournamentOption.value}
                    >
                      {participant.user1.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText id="team1-helper-text">{formError.team1?.message}</FormHelperText>
              </FormControl>
            )}
          /> */}
          {/* Participant 2 */}
        </Stack>
        <Stack
          direction="row"
          spacing={2}
        >
          {/* Name */}
          <FormControl
            fullWidth
            error={!!formError.name}
          >
            <FormLabel htmlFor="name">Match Name</FormLabel>
            <TextField
              {...register('name', {
                required: 'The match name is required.',
                minLength: {
                  value: 3,
                  message: 'The name must be at least 3 characters.',
                },
              })}
              required
              id="name"
              error={!!formError.name}
              aria-describedby="name-helper-text"
              placeholder="Match name"
            />
            <FormHelperText id="name-helper-text">{formError.name?.message}</FormHelperText>
          </FormControl>
          {/* Date */}
          <Controller
            control={control}
            name="date"
            rules={{
              required: 'The date is required.',
            }}
            render={({ field: { onChange } }) => (
              <FormControl
                fullWidth
                error={!!formError.date}
              >
                <FormLabel htmlFor="date">Date</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    onChange={(date) => {
                      onChange(date?.toISOString());
                    }}
                    disablePast
                    defaultValue={dayjs(getValues('date'))}
                    format="DD/MM/YYYY"
                  />
                </LocalizationProvider>
                <FormHelperText id="date-helper-text">{formError.date?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={2}
        >
          {/* Duration */}
          <FormControl
            fullWidth
            error={!!formError.duration}
          >
            <FormLabel htmlFor="duration">Match duration (in minutes)</FormLabel>
            <TextField
              {...register('duration', {
                required: 'The match duration is required.',
              })}
              required
              type="number"
              id="duration"
              error={!!formError.duration}
              aria-describedby="duration-helper-text"
            />
            <FormHelperText id="duration-helper-text">{formError.duration?.message}</FormHelperText>
          </FormControl>
          {/* Start time */}
          <Controller
            control={control}
            name="time"
            render={({ field: { onChange } }) => (
              <FormControl
                fullWidth
                error={!!formError.time}
              >
                <FormLabel htmlFor="time">Time</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    onChange={onChange}
                    defaultValue={dayjs(getValues('time'))}
                  />
                </LocalizationProvider>
                <FormHelperText id="time-helper-text">{formError.time?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Stack>
      </Stack>
    );
  };

  return (
    <BaseModal
      headerText="Add Participants"
      onModalClose={onModalClose}
      body={renderBody()}
      primaryButtonText="Create"
      onClickPrimaryButton={handleSubmit(onSubmit)}
      disabledPrimaryButton={isAddMatchLoading}
    />
  );
}
