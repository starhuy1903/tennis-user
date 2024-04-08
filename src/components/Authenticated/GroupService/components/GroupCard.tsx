import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LanguageIcon from '@mui/icons-material/Language';
import PeopleIcon from '@mui/icons-material/People';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import { Fragment } from 'react';

import LinkButton from 'components/Common/LinkButton';
import { LANGUAGES } from 'constants/app';
import { Group, GroupStatus } from 'types/group';
import { displayTimestamp } from 'utils/datetime';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface GroupCardProps {
  data: Group;
}

const GroupCard = ({ data }: GroupCardProps) => {
  const renderActionButton = () => {
    switch (data.status) {
      case GroupStatus.ACTIVE:
        return (
          <LinkButton
            to={`/groups/${data.id}`}
            buttonProps={{ type: 'button', fullWidth: true, variant: 'contained' }}
          >
            Visit group
          </LinkButton>
        );
      case GroupStatus.INACTIVE:
        // return (
        //   <Button
        //     type="button"
        //     fullWidth
        //     variant="contained"
        //     onClick={() => navigate(`/groups/create/${id}`)}
        //   >
        //     Continue creating
        //   </Button>
        // );
        return <Fragment />;
      case GroupStatus.EXPIRED:
        return (
          <Button
            type="button"
            fullWidth
            variant="contained"
          >
            Go to package management
          </Button>
        );
    }
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* {image ? ( */}
      <CardMedia
        sx={{ height: 200, backgroundSize: 'cover' }}
        image={data.image}
      />
      <CardHeader
        title={data.name}
        subheader={
          <>
            <Typography sx={{ display: 'flex', alignItems: 'center', columnGap: '5px', fontSize: '1rem' }}>
              <AccessTimeIcon sx={{ fontSize: 'inherit' }} />
              {displayTimestamp(data.createdAt)}
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', columnGap: '5px', fontSize: '1rem' }}>
              <PeopleIcon sx={{ fontSize: 'inherit' }} />
              {`${data.memberCount} members`}
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', columnGap: '5px', fontSize: '1rem' }}>
              <LanguageIcon sx={{ fontSize: 'inherit' }} />
              {LANGUAGES.find((e) => e.value === data.language)!.label}
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', columnGap: '5px', fontSize: '1rem' }}>
              <LocationOnIcon sx={{ fontSize: 'inherit' }} />
              {data.activityZone}
            </Typography>
          </>
        }
        titleTypographyProps={{
          // noWrap: true,
          sx: {
            flex: 1,
            fontSize: '1.2rem',
            userSelect: 'none',
          },
        }}
        subheaderTypographyProps={{
          sx: {
            fontSize: '1rem',
            userSelect: 'none',
          },
        }}
        sx={{
          'flex': 1,
          'display': 'flex',
          'alignItems': 'unset',

          '.MuiCardHeader-content': {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      />
      <CardActions>{renderActionButton()}</CardActions>
    </Card>
  );
};

export default GroupCard;
