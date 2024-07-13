import { Avatar, Box, FormControl, FormHelperText, FormLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import {
  DoubleParticipantInfo,
  SingleParticipantInfo,
  SingleParticipantSkeleton,
} from 'components/Authenticated/TournamentService/Common/ParticipantInfo';
import { EditMatchPayload } from 'types/match';
import { EditMatchTeam } from 'types/tournament-fixtures';

import BaseModal from './BaseModal';
import { EditMatchProps } from './types';

type FormType = Omit<EditMatchPayload, 'id'>;

export default function EditMatch({ match, referees, teamData, onUpdate, onModalClose }: EditMatchProps) {
  const teamDataOptions = [...teamData, { id: '' }] as EditMatchTeam[];
  const { handleSubmit, control, formState, register, getValues, watch } = useForm<FormType>({
    defaultValues: {
      name: match.title,
      dateTime: match.matchStartDate || '',
      duration: match.duration,
      venue: match.venue || '',
      refereeId: match.refereeId || '',
      team1Id: match.teams.team1?.id,
      team2Id: match.teams.team2?.id,
    },
  });

  const { errors: formError } = formState;

  const onSubmit: SubmitHandler<FormType> = (data) => {
    const updatedData = { ...data, id: match.id, duration: Number(data.duration) };
    onUpdate(updatedData);
    onModalClose();
  };

  const renderParticipantOption = (option: any) => (
    <MenuItem
      key={option.id}
      value={option.id}
    >
      {option.id ? (
        <>
          {option.user2 ? (
            <DoubleParticipantInfo
              name1={option.user1.name}
              image1={option.user1.image}
              name2={option.user2.name}
              image2={option.user2.image}
            />
          ) : (
            <SingleParticipantInfo
              name={option.user1.name}
              image={option.user1.image}
            />
          )}
        </>
      ) : (
        <SingleParticipantSkeleton />
      )}
    </MenuItem>
  );

  const renderBody = () => {
    return (
      <Stack
        component="form"
        spacing={2}
      >
        <Stack
          direction="row"
          spacing={2}
        >
          {/* Team 1 */}
          <Stack sx={{ width: '100%' }}>
            <Controller
              control={control}
              name="team1Id"
              render={({ field: { onChange, value } }) => (
                <FormControl
                  fullWidth
                  error={!!formError.team1Id}
                >
                  <FormLabel htmlFor="team1Id">Team 1</FormLabel>
                  <Select
                    value={value}
                    id="team1Id"
                    onChange={onChange}
                    aria-describedby="team1Id-helper-text"
                    sx={{ height: 73 }}
                  >
                    {teamDataOptions
                      .filter((option) => !option.id || option.id !== watch('team2Id'))
                      .map(renderParticipantOption)}
                  </Select>
                  <FormHelperText id="team1Id-helper-text">{formError.team1Id?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Stack>
          {/* Team 2 */}
          <Stack sx={{ width: '100%' }}>
            <Controller
              control={control}
              name="team2Id"
              render={({ field: { onChange, value } }) => (
                <FormControl
                  fullWidth
                  error={!!formError.team2Id}
                >
                  <FormLabel htmlFor="team2Id">Team 2</FormLabel>
                  <Select
                    value={value}
                    id="team2Id"
                    onChange={onChange}
                    aria-describedby="team2Id-helper-text"
                    sx={{ height: 73 }}
                  >
                    {teamDataOptions
                      .filter((option) => !option.id || option.id !== watch('team1Id'))
                      .map(renderParticipantOption)}
                  </Select>
                  <FormHelperText id="team2Id-helper-text">{formError.team2Id?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Stack>
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
            <FormLabel htmlFor="name">Match name</FormLabel>
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

          {/* Date time */}
          <Controller
            control={control}
            name="dateTime"
            rules={{
              required: 'The date time is required.',
            }}
            render={({ field: { onChange } }) => (
              <FormControl
                fullWidth
                error={!!formError.dateTime}
              >
                <FormLabel htmlFor="dateTime">Date time</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    onChange={(date) => {
                      onChange(date?.toISOString());
                    }}
                    defaultValue={dayjs(getValues('dateTime'))}
                    format="DD/MM/YYYY HH:mm"
                  />
                </LocalizationProvider>
                <FormHelperText id="dateTime-helper-text">{formError.dateTime?.message}</FormHelperText>
              </FormControl>
            )}
          />

          {/* Venue */}
          <FormControl
            fullWidth
            error={!!formError.venue}
          >
            <FormLabel htmlFor="venue">Venue</FormLabel>
            <TextField
              {...register('venue', {
                required: 'The venue is required.',
                minLength: {
                  value: 3,
                  message: 'The venue must be at least 3 characters.',
                },
              })}
              required
              id="venue"
              error={!!formError.venue}
              aria-describedby="venue-helper-text"
              placeholder="Venue"
            />
            <FormHelperText id="venue-helper-text">{formError.venue?.message}</FormHelperText>
          </FormControl>
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
          <Controller
            control={control}
            name="refereeId"
            render={({ field: { onChange, value } }) => (
              <FormControl
                fullWidth
                error={!!formError.refereeId}
              >
                <FormLabel htmlFor="refereeId">Select referee</FormLabel>
                <Select
                  id="refereeId"
                  value={value}
                  onChange={onChange}
                  aria-describedby="refereeId-helper-text"
                >
                  {referees.map((option) => (
                    <MenuItem
                      key={option.id}
                      value={option.id}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                        }}
                      >
                        <Avatar
                          alt={option.name}
                          src={option.image}
                          sx={{
                            width: 24,
                            height: 24,
                          }}
                        />

                        {option.name}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText id="refereeId-helper-text">{formError.refereeId?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Stack>
      </Stack>
    );
  };

  return (
    <BaseModal
      size="md"
      headerText="Edit match"
      onModalClose={onModalClose}
      body={renderBody()}
      primaryButtonText="Update"
      onClickPrimaryButton={handleSubmit(onSubmit)}
    />
  );
}
