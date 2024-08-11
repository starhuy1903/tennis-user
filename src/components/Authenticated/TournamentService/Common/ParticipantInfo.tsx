import WhatshotIcon from '@mui/icons-material/Whatshot';
import { Avatar, Box, Skeleton, Stack, SxProps, Tooltip, Typography, TypographyProps } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useAppDispatch } from 'store';

import { ModalKey } from 'constants/modal';
import { showModal } from 'store/slice/modalSlice';

type SingleParticipantInfoProps = {
  userId?: string;
  containerSx?: SxProps;
  image?: string;
  name?: string;
  imageSx?: SxProps;
  renderInfo?: () => React.ReactNode;
  shouldShowElo?: boolean;
  elo?: number | null;
  nameTypographyProps?: TypographyProps;
  disabled?: boolean;
};

export function SingleParticipantInfo({
  userId,
  containerSx,
  image,
  name,
  imageSx,
  renderInfo,
  shouldShowElo,
  elo,
  nameTypographyProps,
  disabled = false,
}: SingleParticipantInfoProps) {
  const dispatch = useAppDispatch();

  const handleShowUserProfile = (id: string) => {
    dispatch(
      showModal(ModalKey.SHOW_USER_PROFILE, {
        userId: id,
      })
    );
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      sx={{ opacity: disabled ? 0.5 : 1, ...containerSx }}
    >
      <Avatar
        sx={{ width: '40px', height: '40px', ...imageSx, cursor: userId ? 'pointer' : 'default' }}
        src={image}
        onClick={() => {
          if (userId) {
            handleShowUserProfile(userId);
          }
        }}
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
  userId1?: string;
  userId2?: string;
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
  disabled?: boolean;
};

export function DoubleParticipantInfo({
  userId1,
  userId2,
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
  disabled = false,
}: DoubleParticipantInfoProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1}
      sx={{ opacity: disabled ? 0.5 : 1 }}
    >
      <Stack
        justifyContent="center"
        gap={shouldShowTotalElo ? 0 : 0.5}
        sx={containerSx}
      >
        <SingleParticipantInfo
          userId={userId1}
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
          userId={userId2}
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
