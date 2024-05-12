import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useConfirm } from 'material-ui-confirm';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store';
import * as yup from 'yup';

import CenterLoading from 'components/Common/CenterLoading';
import ControlledSelect from 'components/Common/Input/ControlledSelect';
import ControlledTextField from 'components/Common/Input/ControlledTextField';
import SingleImagePicker from 'components/Common/Input/SingleImagePicker';
import NoData from 'components/Common/NoData';
import { LANGUAGES } from 'constants/app';
import { useCreateGroupMutation } from 'store/api/group/groupApiSlice';
import { useLazyGetPurchasedPackagesQuery } from 'store/api/packageApiSlice';
import { setLoading } from 'store/slice/statusSlice';
import { getValidGroupPackages } from 'utils/package';
import { showSuccess } from 'utils/toast';

import PackageSelector from '../components/PackageSelector';

interface FormData {
  name: string;
  description?: string;
  language: string;
  activityZone: string;
  purchasedPackageId: string;
  image: any;
}

const schema = yup.object({
  name: yup.string().required("Group's name is required"),
  description: yup.string().optional(),
  language: yup.string().required("Group's language is required"),
  activityZone: yup.string().required('Please tell people where your group is active'),
  purchasedPackageId: yup.string().required(),
  image: yup.string().required(),
});

const GroupCreate = () => {
  const navigate = useNavigate();
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const [getPurchasedPackage, { data: purchasedPackages }] = useLazyGetPurchasedPackagesQuery();
  const validGroupPackages = useMemo(
    () => (purchasedPackages ? getValidGroupPackages(purchasedPackages) : []),
    [purchasedPackages]
  );
  const [createGroup] = useCreateGroupMutation();

  const {
    control,
    handleSubmit,
    formState: { isValid, isLoading },
    setValue,
    getValues,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: async () => {
      const _purchasedPackages = await getPurchasedPackage().unwrap();
      const groupPackages = getValidGroupPackages(_purchasedPackages);
      return {
        name: '',
        description: '',
        language: LANGUAGES[0].value,
        activityZone: '',
        purchasedPackageId: groupPackages.length > 0 ? groupPackages[0].id : '',
        image: '',
      };
    },
  });

  const formValue = watch();

  const handleCreateGroup = handleSubmit((data: FormData) => {
    confirm({ title: 'Confirm group creation', description: `Create group ${formValue.name} ?` }).then(async () => {
      try {
        dispatch(setLoading(true));
        await createGroup(data).unwrap();

        showSuccess('Created group successfully.');
        navigate('/groups');
      } catch (error) {
        // handled error
      } finally {
        dispatch(setLoading(false));
      }
    });
  });

  return (
    <Box
      component="form"
      onSubmit={handleCreateGroup}
      sx={{ paddingBottom: '20px', marginY: 4 }}
    >
      <Typography
        variant="h4"
        noWrap
        component="h4"
        sx={{
          display: 'flex',
          fontWeight: 700,
        }}
      >
        GROUP CREATION FORM
      </Typography>
      <Stack
        spacing={2}
        mt={2}
      >
        {isLoading ? (
          <CenterLoading height="80vh" />
        ) : (
          <>
            <Paper sx={{ padding: 2 }}>
              <Typography
                variant="h2"
                fontWeight="bold"
              >
                Package
              </Typography>
              {validGroupPackages && validGroupPackages.length > 0 ? (
                <Box sx={{ width: '50%', padding: '15px' }}>
                  <PackageSelector
                    selected={String(getValues('purchasedPackageId'))}
                    handleSelect={() => {}}
                    packages={validGroupPackages}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 4,
                    height: 500,
                  }}
                >
                  <NoData message="You haven't owned a package that support creating group." />

                  <Button
                    component={Link}
                    to="/pricing"
                    size="large"
                    color="primary"
                    variant="contained"
                    sx={{
                      width: 200,
                    }}
                  >
                    Buy package
                  </Button>
                </Box>
              )}
            </Paper>

            {validGroupPackages && validGroupPackages.length > 0 && (
              <>
                <Paper sx={{ padding: 2 }}>
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
                    type="button"
                    variant="outlined"
                    color="error"
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    onClick={() => navigate(-1, { replace: true })}
                  >
                    Cancel
                  </Button>
                  <Tooltip
                    title={isValid ? 'Create group' : 'Please provide valid information to continue'}
                    placement="top"
                  >
                    <Box component="span">
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={!isValid}
                      >
                        Create group
                      </Button>
                    </Box>
                  </Tooltip>
                </Paper>
              </>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
};

export default GroupCreate;
