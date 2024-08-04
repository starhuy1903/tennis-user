import { Avatar, Box, Typography } from '@mui/material';

import LottieAnimation from 'components/Common/LottieAnimation';

import championData from 'assets/lotties/champion.json';

type WinnerTeamProps = {
  image1?: string;
  image2?: string;
  name1?: string;
  name2?: string;
};

export default function WinnerTeam({ image1, name1, image2, name2 }: WinnerTeamProps) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 8,
        background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
      }}
      mb={2}
    >
      <LottieAnimation
        animationData={championData}
        height={200}
        width={200}
      />
      <Box
        display="flex"
        alignItems="center"
        gap={2}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={1}
        >
          <Avatar
            sx={{ width: '80px', height: '80px' }}
            src={image1}
          />
          <Typography>{name1}</Typography>
        </Box>
        {name2 && (
          <Box
            display="flex"
            alignItems="center"
            gap={1}
          >
            <Avatar
              sx={{ width: '80px', height: '80px' }}
              src={image2}
            />
            <Typography>{name2}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
