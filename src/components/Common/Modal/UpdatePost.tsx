import { Box, FormControl, FormHelperText, FormLabel, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useUpdatePostMutation } from 'store/api/group/postApiSlice';
import { showSuccess } from 'utils/toast';

import SingleImagePicker from '../Input/SingleImagePicker';
import BaseModal from './BaseModal';
import { UpdatePostProps } from './types';

type FormType = {
  content: string;
  image: string;
};

export default function UpdatePost({ groupId, post, onSuccess, onModalClose }: UpdatePostProps) {
  const [updatePost, { isLoading }] = useUpdatePostMutation();

  const { handleSubmit, register, formState, control } = useForm<FormType>({
    mode: 'onTouched',
    defaultValues: {
      content: post.content,
      image: post.image,
    },
  });

  const { errors: formError } = formState;

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    try {
      await updatePost({
        groupId,
        postId: post.id,
        data,
      }).unwrap();

      showSuccess('Updated post successfully.');
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
      headerText="Edit post"
      onModalClose={onModalClose}
      body={renderBody()}
      primaryButtonText="Edit"
      onClickPrimaryButton={handleSubmit(onSubmit)}
      disabledPrimaryButton={isLoading}
    />
  );
}
