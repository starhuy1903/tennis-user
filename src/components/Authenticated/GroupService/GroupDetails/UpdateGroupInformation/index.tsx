import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useConfirm } from 'material-ui-confirm';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store';
import * as yup from 'yup';

import ControlledSelect from 'components/Common/Input/ControlledSelect';
import ControlledTextField from 'components/Common/Input/ControlledTextField';
import SingleImagePicker from 'components/Common/Input/SingleImagePicker';
import { LANGUAGES } from 'constants/app';
import { useUpdateGroupMutation } from 'store/api/group/groupApiSlice';
import { selectGroup } from 'store/slice/groupSlice';
import { setLoading } from 'store/slice/statusSlice';
import { showSuccess } from 'utils/toast';

interface FormType {
  name: string;
  description?: string;
  language: string;
  activityZone: string;
  image: string;
}

const schema = yup.object({
  name: yup.string().required("Group's name is required"),
  description: yup.string().optional(),
  language: yup.string().required("Group's language is required"),
  activityZone: yup.string().required('Please tell people where your group is active'),
  image: yup.string().required(),
});

const UpdateGroupInformation = () => {
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const groupData = useAppSelector(selectGroup);

  const [updateGroup] = useUpdateGroupMutation();

  const {
    control,
    handleSubmit,
    formState: { isValid, isLoading, isDirty },
    setValue,
    reset,
    watch,
  } = useForm<FormType>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: groupData.name,
      description: groupData.description,
      language: groupData.language,
      activityZone: groupData.activityZone,
      image: groupData.image,
    },
  });

  const formValue = watch();

  const handleUpdateGroupInfo = handleSubmit((data: FormType) => {
    confirm({ title: 'Confirm update', description: `Update information change ?` }).then(async () => {
      dispatch(setLoading(true));
      try {
        await updateGroup({ id: groupData.id, data }).unwrap();
        showSuccess('Updated group information successfully!');
        reset(data);
      } catch {
        /* empty */
      }
      dispatch(setLoading(false));
    });
  });

  return (
    <Box
      component="form"
      onSubmit={handleUpdateGroupInfo}
      sx={{ paddingBottom: '20px' }}
    >
      <Stack
        direction="column"
        spacing={2}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Paper sx={{ padding: '10px' }}>
              <Typography
                variant="h2"
                fontWeight="bold"
              >
                Information
              </Typography>
              <Grid
                container
                spacing="15px"
                padding="15px"
              >
                <Grid xs={6}>
                  <ControlledTextField
                    control={control}
                    name="name"
                    label="Group's name"
                    placeholder="Give your group a name"
                  />
                </Grid>
                <Grid xs={6} />
                <Grid xs={6}>
                  <ControlledSelect
                    control={control}
                    name="language"
                    label="Language"
                    options={LANGUAGES}
                  />
                </Grid>
                <Grid xs={6}>
                  <ControlledTextField
                    control={control}
                    name="activityZone"
                    label="Activity zone"
                    placeholder="Where is the group active?"
                  />
                </Grid>
                <Grid xs={12}>
                  <ControlledTextField
                    control={control}
                    name="description"
                    label="Description"
                    placeholder="Describe your group"
                    textfieldProps={{ multiline: true, rows: 3 }}
                  />
                </Grid>
                <Grid xs={12}>
                  <SingleImagePicker
                    label="Upload a background image for your group"
                    imageUrl={formValue.image}
                    handleUpload={(value) => {
                      setValue('image', value);
                    }}
                    handleRemove={() => {
                      setValue('image', '');
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
            <Paper sx={{ display: 'flex', columnGap: '20px', justifyContent: 'center', padding: '10px' }}>
              <Button
                type="submit"
                variant="contained"
                disabled={!isValid || !isDirty}
              >
                Update information
              </Button>
            </Paper>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default UpdateGroupInformation;
