import { Avatar, AvatarGroup, Box, Stack, SxProps, Typography } from '@mui/material';

type SingleParticipantInfoProps = {
  image?: string;
  name?: string;
  imageSx?: SxProps;
  renderInfo?: () => React.ReactNode;
};

export function SingleParticipantInfo({ image, name, imageSx, renderInfo }: SingleParticipantInfoProps) {
  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        gap={2}
      >
        <Avatar
          sx={imageSx}
          src={image}
        />
        {renderInfo ? renderInfo() : <Typography variant="caption">{name}</Typography>}
      </Box>
    </Box>
  );
}

type DoubleParticipantInfoProps = {
  image1?: string;
  name1?: string;
  image2?: string;
  name2?: string;
};

export function DoubleParticipantInfo({ image1, name1, image2, name2 }: DoubleParticipantInfoProps) {
  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
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
