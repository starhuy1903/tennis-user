import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import { GroupStatus } from 'types/group';
import { displayTimestamp } from 'utils/datetime';

interface GroupCardProps {
  id: number;
  image?: string;
  name: string;
  status: GroupStatus;
  createdAt: string;
}

const GroupCard = ({ id, image, name, status, createdAt }: GroupCardProps) => {
  const navigate = useNavigate();

  const renderActionButton = () => {
    switch (status) {
      case GroupStatus.ACTIVE:
        return (
          <Button
            type="button"
            fullWidth
            variant="contained"
            onClick={() => navigate(`/groups/${id}`)}
          >
            Go to group
          </Button>
        );
      case GroupStatus.INACTIVE:
        return (
          <Button
            type="button"
            fullWidth
            variant="contained"
            onClick={() => navigate(`/groups/create/${id}`)}
          >
            Continue creating
          </Button>
        );
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
        // component="img"
        sx={{ height: 200, backgroundSize: 'cover' }}
        image={image}
        // alt=""
        // height={200}
      />
      {/* ) : (
        <CardMedia
          component={Box}
          height={200}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '15px',
            borderBottom: (theme) => `1px solid ${theme.palette.common.black}`,
          }}
        >
          <Typography
            sx={{
              textAlign: 'center',
              userSelect: 'none',
            }}
          >
            {name}
          </Typography>
        </CardMedia>
      )} */}
      <CardHeader
        title={name}
        subheader={`Created at ${displayTimestamp(createdAt)}`}
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
