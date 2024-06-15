import { Button, FormControl, FormHelperText, FormLabel, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

import { useGenerateGroupMutation } from 'store/api/tournament/creator/fixture';
import { GeneratedGroup } from 'types/tournament-fixtures';

type GenerateGroupProps = {
  tournamentId: number;
  setGroupData: React.Dispatch<React.SetStateAction<GeneratedGroup[] | null>>;
};

type FormType = {
  numberOfGroups: number;
};

export default function GenerateGroup({ tournamentId, setGroupData }: GenerateGroupProps) {
  const [generateGroupRequest, { isLoading: generating }] = useGenerateGroupMutation();

  const { register, formState, handleSubmit } = useForm<FormType>({
    mode: 'onChange',
    defaultValues: {
      numberOfGroups: 2,
    },
  });

  const { errors: formError } = formState;

  const handleGenerateGroup = handleSubmit(async (data) => {
    setGroupData(null);
    try {
      const res = await generateGroupRequest({
        tournamentId,
        body: {
          numberOfGroups: Number(data.numberOfGroups),
        },
      }).unwrap();
      setGroupData(res);
    } catch (error) {
      // handled error
    }
  });

  return (
    <Stack
      direction="row"
      alignItems="flex-end"
      gap={2}
      component="form"
    >
      <FormControl
        error={!!formError.numberOfGroups}
        fullWidth
      >
        <FormLabel htmlFor="email">Number of group</FormLabel>
        <TextField
          {...register('numberOfGroups')}
          required
          id="numberOfGroups"
          type="number"
          error={!!formError.numberOfGroups}
          aria-describedby="numberOfGroups-helper-text"
        />
        <FormHelperText id="numberOfGroups-helper-text">{formError.numberOfGroups?.message}</FormHelperText>
      </FormControl>
      <Button
        fullWidth
        variant="contained"
        onClick={handleGenerateGroup}
        disabled={generating}
        sx={{ mb: '2px', height: '56px' }}
      >
        Generate group
      </Button>
    </Stack>
  );
}
