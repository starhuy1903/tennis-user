import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useConfirm } from 'material-ui-confirm';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'store';
import * as yup from 'yup';

import CustomLink from 'components/Common/CustomLink';
import ControlledSelect from 'components/Common/Input/ControlledSelect';
import ControlledTextField from 'components/Common/Input/ControlledTextField';
import SingleImagePicker from 'components/Common/Input/SingleImagePicker';
import { LANGUAGES } from 'constants/app';
import { useLazyGetBougthPackagesQuery } from 'store/api/group/boughtPackageApiSlice';
import {
  useCreateGroupMutation,
  useLazyGetGroupDetailsQuery,
  useUpdateGroupMutation,
} from 'store/api/group/groupApiSlice';
import { setLoading } from 'store/slice/statusSlice';

import PackageSelector from '../../components/PackageSelector';

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
  image: yup.mixed().required().nullable(),
});

const UpdateGroupInformation = () => {
  const navigate = useNavigate();
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const { id } = useParams();

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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: async () => {
      let detail;

      try {
        detail = await getGroupDetail(parseInt(id!)).unwrap();

        return {
          name: detail.data.name,
          description: detail.data.description,
          language: detail.data.language,
          activityZone: detail.data.activityZone,
          image: null,
        };
      } catch {
        toast.error('Detail not found!');
        navigate('/groups', { replace: true });

        return {
          name: '',
          description: '',
          language: LANGUAGES[0].value,
          activityZone: '',
          image: null,
        };
      }
    },
  });

  const formValue = watch();

  const handleCreateGroup = handleSubmit((data: FormData) => {
    confirm({ title: 'Confirm update', description: `Update information change ?` })
      .then(async () => {
        dispatch(setLoading(true));
        try {
          await updateGroup({ id: groupDetail!.data.id, data }).unwrap();
          toast.success('Information updated');
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
      onSubmit={handleCreateGroup}
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
                    image={formValue.image}
                    handleUpload={(value) => {
                      setValue('image', value);
                    }}
                    handleRemove={() => {
                      setValue('image', null);
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </>
        )}
        <Paper sx={{ display: 'flex', columnGap: '20px', justifyContent: 'center', padding: '10px' }}>
          <Button
            type="submit"
            variant="contained"
            disabled={!isValid || !isDirty}
          >
            Update information
          </Button>
        </Paper>
      </Stack>
    </Box>
  );
};

export default UpdateGroupInformation;
