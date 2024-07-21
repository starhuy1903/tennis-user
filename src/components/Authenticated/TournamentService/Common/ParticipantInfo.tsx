import WhatshotIcon from '@mui/icons-material/Whatshot';
import { Avatar, Box, Skeleton, Stack, SxProps, Tooltip, Typography, TypographyProps } from '@mui/material';
import { grey } from '@mui/material/colors';

type SingleParticipantInfoProps = {
  containerSx?: SxProps;
  image?: string;
  name?: string;
  imageSx?: SxProps;
  renderInfo?: () => React.ReactNode;
  shouldShowElo?: boolean;
  elo?: number | null;
  nameTypographyProps?: TypographyProps;
};

export function SingleParticipantInfo({
  containerSx,
  image,
  name,
  imageSx,
  renderInfo,
  shouldShowElo,
  elo,
  nameTypographyProps,
}: SingleParticipantInfoProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      sx={containerSx}
    >
      <Avatar
        sx={{ width: '40px', height: '40px', ...imageSx }}
        src={image}
      />
      {renderInfo ? (
        renderInfo()
      ) : (
        <Stack>
          <Typography
            fontSize={14}
            variant="caption"
            {...nameTypographyProps}
          >
            {name}
          </Typography>
          {shouldShowElo && (
            <Tooltip title="elo">
              <Box
                display="flex"
                alignItems="center"
                gap={0.5}
              >
                <WhatshotIcon
                  color="warning"
                  sx={{ fontSize: 16 }}
                />
                <Typography
                  fontSize={10}
                  fontWeight={400}
                >
                  {elo ? elo : '--'}
                </Typography>
              </Box>
            </Tooltip>
          )}
        </Stack>
      )}
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

export const UndefinedSinglePlayer = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
    >
      <Skeleton
        variant="circular"
        width={40}
        height={40}
        animation={false}
      />
      <Typography
        fontSize={14}
        color={grey[500]}
      >
        Undefined
      </Typography>
    </Box>
  );
};

type DoubleParticipantInfoProps = {
  containerSx?: SxProps;
  image1?: string;
  name1?: string;
  image2?: string;
  name2?: string;
  shouldShowElo?: boolean;
  elo1?: number | null;
  elo2?: number | null;
  shouldShowTotalElo?: boolean;
  totalElo?: number | null;
};

export function DoubleParticipantInfo({
  containerSx,
  image1,
  name1,
  image2,
  name2,
  shouldShowElo,
  elo1,
  elo2,
  shouldShowTotalElo,
  totalElo,
}: DoubleParticipantInfoProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1}
    >
      <Stack
        justifyContent="center"
        gap={shouldShowTotalElo ? 0 : 0.5}
        sx={containerSx}
      >
        <SingleParticipantInfo
          name={name1}
          image={image1}
          shouldShowElo={shouldShowElo}
          elo={elo1}
          imageSx={{ width: '30px', height: '30px' }}
          nameTypographyProps={{ fontSize: 12 }}
        />
        {shouldShowTotalElo && (
          <Stack pl={5}>
            <Tooltip title="total elo">
              <Box
                display="flex"
                alignItems="center"
                gap={0.5}
              >
                <WhatshotIcon
                  color="warning"
                  fontSize="small"
                />
                <Typography
                  fontSize={10}
                  fontWeight={400}
                >
                  {totalElo ? totalElo : '--'}
                </Typography>
              </Box>
            </Tooltip>
          </Stack>
        )}
        <SingleParticipantInfo
          name={name2}
          image={image2}
          shouldShowElo={shouldShowElo}
          elo={elo2}
          imageSx={{ width: '30px', height: '30px' }}
          nameTypographyProps={{ fontSize: 12 }}
        />
      </Stack>
    </Stack>
  );
}
