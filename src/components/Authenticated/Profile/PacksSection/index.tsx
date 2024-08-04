import { Button, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import NoData from 'components/Common/NoData';
import { FormatDateTime } from 'constants/datetime';
import { ModalKey } from 'constants/modal';
import { useGetMyPackagesQuery } from 'store/api/packageApiSlice';
import { showModal } from 'store/slice/modalSlice';
import { displayDateTime } from 'utils/datetime';

const titles = ['Package', 'Activation Date', 'Valid Until', 'Expired'];

const formatDateTime = (dateTime: string) => {
  return displayDateTime({
    dateTime,
    targetFormat: FormatDateTime.DATE_AND_FULL_TIME,
  });
};

const PacksSection = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNavigate = (serviceName: string) => {
    navigate(`/${serviceName}/create`);
  };

  const { data: myPackagesData, isLoading } = useGetMyPackagesQuery();

  if (isLoading) {
    return <CenterLoading />;
  }

  return (
    <>
      {myPackagesData && myPackagesData.length > 0 ? (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            aria-label="packages table"
          >
            <TableHead>
              <TableRow>
                {titles.map((title) => (
                  <TableCell
                    align="center"
                    key={title}
                  >
                    {title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {myPackagesData.map((pack) => (
                <TableRow
                  key={pack.id}
                  onClick={() => {
                    dispatch(
                      showModal(ModalKey.SHOW_PACKAGE_DETAIL, {
                        package: pack,
                        onNavigate: handleNavigate,
                      })
                    );
                  }}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell align="center">{pack.name}</TableCell>
                  <TableCell align="center">{formatDateTime(pack.startDate)}</TableCell>
                  <TableCell align="center">{formatDateTime(pack.endDate)}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={pack.expired ? 'Expired' : 'Active'}
                      color={pack.expired ? 'error' : 'success'}
                      sx={{
                        color: 'white',
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4,
            height: 500,
          }}
        >
          <NoData message="You haven't owned a package yet." />

          <Button
            component={Link}
            to="/pricing"
            size="large"
            color="primary"
            variant="contained"
            sx={{
              width: 200,
            }}
          >
            Buy package
          </Button>
        </Box>
      )}
    </>
  );
};

export default PacksSection;
