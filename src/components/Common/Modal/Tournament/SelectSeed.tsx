import { Box, FormControl, FormHelperText, FormLabel, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

import { ApplicantTitle } from 'components/Authenticated/TournamentService/TournamentDetails/Participants/Creator/ApplicantList/ApplicantItem';
import { useSeedingParticipantMutation } from 'store/api/tournament/creator/participant';
import { showSuccess } from 'utils/toast';

import BaseModal from '../BaseModal';
import { SelectSeedProps } from '../types';

type FormType = {
  seed: number | null;
};

export default function SelectSeed({ tournamentId, applicantData, onSubmit, onModalClose }: SelectSeedProps) {
  const [selectSeedRequest, { isLoading: isSeeding }] = useSeedingParticipantMutation();

  const { handleSubmit, register, formState } = useForm<FormType>({
    mode: 'onTouched',
    defaultValues: {
      seed: applicantData.seed,
    },
  });

  const { errors: formError } = formState;

  const handleSelectSeed = handleSubmit(async (data) => {
    const seedNum = Number(data.seed);
    if (!data.seed || seedNum === applicantData.seed) {
      onModalClose();
      return;
    }
    try {
      await selectSeedRequest({ seed: seedNum, tournamentId, userId: applicantData.user1.id }).unwrap();
      showSuccess('Seeded the participant successfully.');
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
      >
        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '20px' }}>
          <ApplicantTitle user={applicantData.user1} />
          {applicantData.user2 && <ApplicantTitle user={applicantData.user2} />}
        </Box>
        <FormControl
          fullWidth
          error={!!formError.seed}
        >
          <FormLabel htmlFor="email">Seed</FormLabel>
          <TextField
            {...register('seed')}
            required
            id="seed"
            type="number"
            error={!!formError.seed}
            aria-describedby="email-helper-text"
          />
          <FormHelperText id="email-helper-text">{formError.seed?.message}</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  return (
    <BaseModal
      headerText="Seeding Participant"
      onModalClose={onModalClose}
      body={renderBody()}
      primaryButtonText="Submit"
      onClickPrimaryButton={handleSelectSeed}
      disabledPrimaryButton={isSeeding}
      disabledSecondaryButton={isSeeding}
    />
  );
}
