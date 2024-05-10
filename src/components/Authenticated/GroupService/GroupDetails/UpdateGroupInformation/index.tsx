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
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'store';
import * as yup from 'yup';

import ControlledSelect from 'components/Common/Input/ControlledSelect';
import ControlledTextField from 'components/Common/Input/ControlledTextField';
import SingleImagePicker from 'components/Common/Input/SingleImagePicker';
import { LANGUAGES } from 'constants/app';
import { useLazyGetGroupDetailsQuery, useUpdateGroupMutation } from 'store/api/group/groupApiSlice';
import { setLoading } from 'store/slice/statusSlice';
import { showError, showSuccess } from 'utils/toast';

interface FormData {
  name: string;
  description?: string;
  language: string;
  activityZone: string;
  image: any | null;
}

const schema = yup.object({
  name: yup.string().required("Group's name is required"),
  description: yup.string().optional(),
  language: yup.string().required("Group's language is required"),
  activityZone: yup.string().required('Please tell people where your group is active'),
  image: yup.string().required(),
});

const UpdateGroupInformation = () => {
  const navigate = useNavigate();
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const { groupId } = useParams();

  const [updateGroup] = useUpdateGroupMutation();
  const [getGroupDetail, { data: groupDetail }] = useLazyGetGroupDetailsQuery();

  const {
    control,
    handleSubmit,
    formState: { isValid, isLoading, isDirty },
    setValue,
    reset,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: async () => {
      try {
        const res = await getGroupDetail(parseInt(groupId!)).unwrap();

        return {
          name: res.name,
          description: res.description,
          language: res.language,
          activityZone: res.activityZone,
          image: res.image,
        };
      } catch (err) {
        showError('Group not found!');
        navigate('/groups', { replace: true });

        return {
          name: '',
          description: '',
          language: LANGUAGES[0].value,
          activityZone: '',
          image: '',
        };
      }
    },
  });

  const formValue = watch();

  const handleUpdateGroupInfo = handleSubmit((data: FormData) => {
    confirm({ title: 'Confirm update', description: `Update information change ?` })
      .then(async () => {
        dispatch(setLoading(true));
        try {
          await updateGroup({ id: groupDetail!.id, data }).unwrap();
          showSuccess('Updated group information successfully!');
          reset(data);
        } catch {
          /* empty */
        }
        dispatch(setLoading(false));
      })
      .catch(() => {});
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
