import { Stack, Typography } from '@mui/material';

export const InfoItem = ({
  label,
  value,
  isBold = false,
  onClickValue,
}: {
  label: string;
  value: string;
  isBold?: boolean;
  onClickValue?: () => void;
}) => (
  <Stack
    direction="row"
    justifyContent="space-between"
  >
    <Typography sx={{ fontWeight: isBold ? 'bold' : 'normal' }}>{label}</Typography>
    <Typography
      sx={{ fontWeight: isBold ? 'bold' : 'normal' }}
      onClick={onClickValue}
      style={{ cursor: onClickValue ? 'pointer' : 'default' }}
    >
      {value}
    </Typography>
  </Stack>
);
