import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import ControlledSelect from 'components/Common/Input/ControlledSelect';
import ControlledTextField from 'components/Common/Input/ControlledTextField';
import ControlledTinyEditor from 'components/Common/Input/ControlledTinyEditor';

interface FormData {
  name: string;
  description?: string;
  language: string;
  activityZone: string;
}

const schema = yup.object({
  name: yup.string().required("Group's name is required"),
  description: yup.string().optional(),
  language: yup.string().required("Group's language is required"),
  activityZone: yup.string().required("Group's activity zone is required"),
});

const GroupCreate = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: { name: '', description: '', language: 'US', activityZone: '' },
  });

  const handleCreateGroup = handleSubmit((data: FormData) => {
    console.log(data);
  });

  return (
    <Box
      component="form"
      onSubmit={handleCreateGroup}
    >
      <Typography
        variant="h1"
        textAlign="center"
        marginBottom="10px"
      >
        Create your group
      </Typography>
      <Paper sx={{ padding: '10px' }}>
        <Typography variant="h2">Information</Typography>
        <Grid
          container
          spacing="15px"
          padding="15px"
        >
          <Grid xs={4}>
            <ControlledTextField
              control={control}
              name="name"
              label="Group's name"
            />
          </Grid>
          <Grid xs={4}>
            <ControlledSelect
              control={control}
              name="language"
              label="Group's language"
              options={[
                { value: 'US', label: 'English - US' },
                { value: 'VN', label: 'Vietnamese' },
              ]}
            />
          </Grid>
          <Grid xs={4}>
            <ControlledTextField
              control={control}
              name="activityZone"
              label="Group's activity zone"
            />
          </Grid>
          <Grid xs={12}>
            <ControlledTinyEditor
              control={control}
              name="description"
              label="Group's description"
              placeholder="Describe your group here..."
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', columnGap: '20px', justifyContent: 'center', marginTop: '10px' }}>
          <Button
            type="button"
            variant="outlined"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            onClick={() => navigate(-1, { replace: true })}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!isValid}
          >
            Create group
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default GroupCreate;
