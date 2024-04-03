import { Box } from '@mui/material';
import { useCallback } from 'react';
import { Accept, ErrorCode, FileRejection, useDropzone } from 'react-dropzone';

const RejectErrors = {
  [ErrorCode.FileTooLarge]: `Your file couldn't be uploaded. Please ensure the file size is 2MB or smaller.`,
  [ErrorCode.FileInvalidType]: `Sorry, file type not supported. Please upload a .png or .jpg file.`,
};

export function DropFileContainer({
  onDropFile,
  onRejectFile,
  children,
  acceptMIMETypes,
  multiple = false,
  renderChildren,
  disabled = false,
  maxSize,
}: {
  onDropFile: (file: File | null) => void;
  onRejectFile?: (error: string) => void;
  children?: React.ReactNode;
  acceptMIMETypes: Accept;
  multiple?: boolean;
  renderChildren?: (props: {
    open: () => void;
    disabled: boolean;
  }) => JSX.Element;
  disabled?: boolean;
  maxSize: number;
}) {
  const onDropAccepted = useCallback(
    (files: File[]) => {
      onDropFile(files[0]);
      onRejectFile?.('');
    },
    [onDropFile, onRejectFile],
  );

  const onDropRejected = useCallback(
    (fileRejections: FileRejection[]) => {
      onDropFile(null);
      onRejectFile?.(
        RejectErrors[
          fileRejections[0].errors[0].code as keyof typeof RejectErrors
        ],
      );
    },
    [onDropFile, onRejectFile],
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: acceptMIMETypes,
    multiple,
    maxSize,
    onDropAccepted,
    onDropRejected,
    disabled,
  });

  return (
    <Box {...getRootProps()}>
      <input {...getInputProps()} />
      {renderChildren ? renderChildren({ open, disabled }) : children}
    </Box>
  );
}

export default DropFileContainer;
