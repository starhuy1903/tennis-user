import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { memo, useCallback } from 'react';
import { useAppDispatch } from 'store';

import { ImageFileConfig } from 'constants/app';
import { ModalKey } from 'constants/modal';
import { showModal } from 'store/slice/modalSlice';

import DropFileContainer from './DropFileContainer';
import ImagePreview from './ImagePreview';
import UploadImageCard from './UploadImageCard';

interface SingleImagePickerProps {
  label: string;
  image: File | null;
  handleUpload: (file: File | null) => void;
  handleRemove: () => void;
  disabled?: boolean;
}

const SingleImagePicker = memo(
  ({ label, image, handleUpload, handleRemove, disabled: isDisabled }: SingleImagePickerProps) => {
    const renderUpdateImageContainer = ({ open, disabled }: { open: () => void; disabled: boolean }) => (
      <UploadImageCard
        open={open}
        disabled={disabled}
      />
    );

    const dispatch = useAppDispatch();

    const handleDropImage = useCallback(
      (file: File | null) => {
        if (!file) {
          return;
        }

        dispatch(
          showModal(ModalKey.CROP_IMAGE, {
            image: file,
            aspect: 16 / 9,
            onSubmit: handleUpload,
          })
        );
      },
      [dispatch, handleUpload]
    );

    return (
      <FormControl>
        <FormLabel sx={{ mb: 1 }}>{label}</FormLabel>
        <Box>
          {image ? (
            <ImagePreview
              image={image}
              onDeleteImage={handleRemove}
              disabled={isDisabled}
            />
          ) : (
            <DropFileContainer
              onDropFile={handleDropImage}
              acceptMIMETypes={ImageFileConfig.ACCEPTED_MINE_TYPES}
              renderChildren={renderUpdateImageContainer}
              maxSize={ImageFileConfig.MAX_SIZE}
              disabled={isDisabled}
            />
          )}
        </Box>
      </FormControl>
    );
  }
);

export default SingleImagePicker;
