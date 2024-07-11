import GroupIcon from '@mui/icons-material/Group';
import { Button, FormControl, FormHelperText, FormLabel, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

import { useGenerateGroupMutation } from 'store/api/tournament/creator/fixture';
import { GeneratedGroup } from 'types/tournament-fixtures';
import { showSuccess } from 'utils/toast';

import groupImage from 'assets/images/open-tournament/setup-fixture-group.jpg';

type GenerateGroupProps = {
  tournamentId: number;
  setGroupData: (data: GeneratedGroup[] | null) => void;
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
      showSuccess('Generated group successfully');
    } catch (error) {
      // handled error
    }
  });

  return (
    <Stack
      direction="row"
      gap={2}
      component="form"
    >
      <img
        src={groupImage}
        alt=""
        style={{ height: 300 }}
      />
      <Stack width="100%">
        <FormControl
          error={!!formError.numberOfGroups}
          fullWidth
        >
          <FormLabel htmlFor="numberOfGroups">Number of groups</FormLabel>
          <TextField
            {...register('numberOfGroups', {
              validate: (value) => Number(value) >= 2 || 'Number of groups must be at least 2',
            })}
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
          sx={{ mt: 2 }}
          startIcon={<GroupIcon />}
        >
          Generate group
        </Button>
      </Stack>
    </Stack>
  );
}
