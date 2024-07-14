import { Avatar, AvatarGroup, Box, Skeleton, Stack, SxProps, Typography } from '@mui/material';

type SingleParticipantInfoProps = {
  containerSx?: SxProps;
  image?: string;
  name?: string;
  imageSx?: SxProps;
  renderInfo?: () => React.ReactNode;
};

export function SingleParticipantInfo({ containerSx, image, name, imageSx, renderInfo }: SingleParticipantInfoProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      sx={containerSx}
    >
      <Avatar
        sx={imageSx}
        src={image}
      />
      {renderInfo ? renderInfo() : <Typography variant="caption">{name}</Typography>}
    </Box>
  );
}

export function SingleParticipantSkeleton() {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
    >
      <Skeleton
        variant="circular"
        width={40}
        height={40}
      />
      <Typography variant="caption">N/A</Typography>
    </Box>
  );
}

type DoubleParticipantInfoProps = {
  containerSx?: SxProps;
  image1?: string;
  name1?: string;
  image2?: string;
  name2?: string;
};

export function DoubleParticipantInfo({ containerSx, image1, name1, image2, name2 }: DoubleParticipantInfoProps) {
  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
        sx={containerSx}
      >
        <AvatarGroup max={2}>
          <Avatar src={image1} />
          <Avatar src={image2} />
        </AvatarGroup>
        <Stack>
          <Typography variant="caption">{name1}</Typography>
          <Typography variant="caption">{name2}</Typography>
        </Stack>
      </Box>
    </Box>
  );
}
