import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import { configs } from 'configurations';
import { memo, useCallback } from 'react';
import { useAppDispatch } from 'store';

import { ImageFileConfig } from 'constants/app';
import { ModalKey } from 'constants/modal';
import { showModal } from 'store/slice/modalSlice';
import auth from 'utils/auth';
import { showError } from 'utils/toast';

import DropFileContainer from './DropFileContainer';
import ImagePreview from './ImagePreview';
import UploadImageCard from './UploadImageCard';

interface SingleImagePickerProps {
  label: string;
  imageUrl?: string;
  handleUpload: (imageUrl: string) => void;
  handleRemove: () => void;
  disabled?: boolean;
  imageAspect?: number;
  imageSxStyle?: SxProps;
}

const SingleImagePicker = memo(
  ({
    label,
    imageUrl,
    handleUpload,
    handleRemove,
    disabled,
    imageAspect = 16 / 9,
    imageSxStyle,
  }: SingleImagePickerProps) => {
    const dispatch = useAppDispatch();

    const handleUploadImage = useCallback(
      (file: File | null) => {
        if (!file) {
          return;
        }
        const formData = new FormData();
        formData.append('file', file);

        axios
          .post<{ url: string }>(`${configs.apiUrl}/core/files/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${auth.getAccessToken()}`,
            },
          })
          .then((res) => {
            handleUpload(res.data.url);
          })
          .catch((_) => {
            showError('Upload file failed');
          });
      },
      [handleUpload]
    );

    const handleDropImage = useCallback(
      (file: File | null) => {
        if (!file) {
          return;
        }

        dispatch(
          showModal(ModalKey.CROP_IMAGE, {
            image: file,
            aspect: imageAspect,
            onSubmit: handleUploadImage,
          })
        );
      },
      [dispatch, handleUploadImage, imageAspect]
    );

    const renderUpdateImageContainer = ({
      open,
      disabled: disabledDropFile,
    }: {
      open: () => void;
      disabled: boolean;
    }) => (
      <UploadImageCard
        open={open}
        disabled={disabledDropFile}
      />
    );

    return (
      <FormControl>
        <FormLabel sx={{ mb: 1 }}>{label}</FormLabel>
        <Box>
          {imageUrl ? (
            <ImagePreview
              imageUrl={imageUrl}
              onDeleteImage={handleRemove}
              sxStyle={imageSxStyle}
            />
          ) : (
            <DropFileContainer
              onDropFile={handleDropImage}
              acceptMIMETypes={ImageFileConfig.ACCEPTED_MINE_TYPES}
              renderChildren={renderUpdateImageContainer}
              maxSize={ImageFileConfig.MAX_SIZE}
              disabled={disabled}
            />
          )}
        </Box>
      </FormControl>
    );
  }
);

export default SingleImagePicker;
