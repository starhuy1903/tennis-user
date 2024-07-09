import { Box, FormControl, FormHelperText, FormLabel, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useCreatePostMutation } from 'store/api/group/postApiSlice';
import { showSuccess } from 'utils/toast';

import SingleImagePicker from '../Input/SingleImagePicker';
import BaseModal from './BaseModal';
import { CreatePostProps } from './types';

type FormType = {
  content: string;
  image: string;
};

export default function CreatePost({ groupId, onSuccess, onModalClose }: CreatePostProps) {
  const [createPost, { isLoading }] = useCreatePostMutation();

  const { handleSubmit, register, formState, control } = useForm<FormType>({
    mode: 'onTouched',
    defaultValues: {
      content: '',
      image: '',
    },
  });

  const { errors: formError } = formState;

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    try {
      await createPost({
        groupId,
        content: data.content,
        image: data.image,
      }).unwrap();

      showSuccess('Created post successfully.');
      onModalClose();
      onSuccess?.();
    } catch (err) {
      console.error(err);
    }
  };

  const renderBody = () => {
    return (
      <Box
        component="form"
        autoComplete="off"
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <FormControl
          fullWidth
          error={!!formError.content}
        >
          <FormLabel htmlFor="content">Content</FormLabel>
          <TextField
            {...register('content', {
              required: 'Content is required',
            })}
            required
            id="content"
            error={!!formError.content}
            aria-describedby="content-helper-text"
            placeholder="What's on your mind?"
            multiline
            rows={4}
          />
          <FormHelperText id="content-helper-text">{formError.content?.message}</FormHelperText>
        </FormControl>

        <Controller
          name="image"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <SingleImagePicker
              label="Upload image"
              imageUrl={value}
              handleUpload={onChange}
              handleRemove={() => {
                onChange('');
              }}
              isCrop={false}
            />
          )}
        />
      </Box>
    );
  };

  return (
    <BaseModal
      headerText="Create post"
      onModalClose={onModalClose}
      body={renderBody()}
      primaryButtonText="Create"
      onClickPrimaryButton={handleSubmit(onSubmit)}
      disabledPrimaryButton={isLoading}
    />
  );
}
