import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { memo, useCallback } from 'react';

import { ImageFileConfig } from 'constants/app';

import DropFileContainer from './DropFileContainer';
import ImagePreview from './ImagePreview';
import UploadImageCard from './UploadImageCard';
import { useAppDispatch } from 'store';
import { showModal } from 'store/slice/modalSlice';
import { ModalKey } from 'constants/modal';

interface SingleImagePickerProps {
  label: string;
  image?: File;
  handleUpload: (file: File | null) => void;
  handleRemove: () => void;
}

const SingleImagePicker = memo(({ label, image, handleUpload, handleRemove }: SingleImagePickerProps) => {
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
        }),
      );
    },
    [dispatch, handleUpload],
  );


  return (
    <FormControl>
      <FormLabel sx={{ mb: 1 }}>{label}</FormLabel>
      <Box>
        {image ? (
          <ImagePreview
            image={image}
            onDeleteImage={handleRemove}
          />
        ) : (
          <DropFileContainer
            onDropFile={handleDropImage}
            acceptMIMETypes={ImageFileConfig.ACCEPTED_MINE_TYPES}
            renderChildren={renderUpdateImageContainer}
            maxSize={ImageFileConfig.MAX_SIZE}
          />
        )}
      </Box>
    </FormControl>
  );
});

export default SingleImagePicker;
