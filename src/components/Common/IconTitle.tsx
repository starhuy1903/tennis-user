import { Stack, Typography } from '@mui/material';

export const IconTitle = ({ icon, title, gap = 1 }: { icon: React.ReactNode; title: string; gap?: number }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={gap}
    >
      {icon}
      <Typography variant="subtitle1">{title}</Typography>
    </Stack>
  );
};
