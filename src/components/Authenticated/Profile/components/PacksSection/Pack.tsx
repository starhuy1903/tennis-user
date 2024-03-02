import LinkButton from '@/components/Common/LinkButton';
import { displayTimestamp } from '@/utils/format';
import { CardActions } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface PackProps {
  id: string;
  name: string;
  startTimestamp: string;
  endTimestamp: string;
  groupName?: string;
  groupId?: string;
}

const Pack = ({ id, name, startTimestamp, endTimestamp, groupName }: PackProps) => {
  return (
    <Card>
      <CardHeader
        title={name}
        titleTypographyProps={{ variant: 'h2' }}
      />
      <CardContent>
        <Stack>
          <Box>
            <Typography
              display="inline"
              fontWeight="bold"
              marginRight="10px"
            >
              Started at:
            </Typography>
            <Typography display="inline">{displayTimestamp(startTimestamp)}</Typography>
          </Box>
          <Box>
            <Typography
              display="inline"
              fontWeight="bold"
              marginRight="10px"
            >
              Last until:
            </Typography>
            <Typography display="inline">{displayTimestamp(endTimestamp)}</Typography>
          </Box>
          <Box>
            {groupName ? (
              <>
                <Typography
                  display="inline"
                  fontWeight="bold"
                  marginRight="10px"
                >
                  Group:
                </Typography>
                <Typography display="inline">{groupName}</Typography>
              </>
            ) : (
              <Typography fontWeight="bold">Group not created.</Typography>
            )}
          </Box>
        </Stack>
      </CardContent>
      <CardActions>
        {groupName ? (
          <LinkButton
            buttonProps={{ variant: 'contained', fullWidth: true }}
            to={`/groups/${id}`}
          >
            Go to group
          </LinkButton>
        ) : (
          <LinkButton
            buttonProps={{ variant: 'contained', fullWidth: true }}
            to={`/groups/${id}/create`}
          >
            Create group
          </LinkButton>
        )}
      </CardActions>
    </Card>
  );
};

export default Pack;
