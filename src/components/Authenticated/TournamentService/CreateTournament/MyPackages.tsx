import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useMemo } from 'react';

import NoData from 'components/Common/NoData';
import { FormatDateTime } from 'constants/datetime';
import { ServiceLevel, ServiceType } from 'constants/service';
import { UserPackage } from 'types/package';
import { displayDateTime } from 'utils/datetime';

interface MyPackagesProps {
  packagesData: UserPackage[];
  onChooseMyPackage: (id: string) => void;
}

const titles = ['Package', 'Activation Date', 'Valid Until', ''];

const formatDateTime = (dateTime: string) => {
  return displayDateTime({
    dateTime,
    targetFormat: FormatDateTime.DATE_AND_FULL_TIME,
  });
};

export default function MyPackages({ packagesData, onChooseMyPackage }: MyPackagesProps) {
  const packages = useMemo(
    () =>
      packagesData.filter(
        (pack) =>
          pack.services.some(
            (service) =>
              service.type === ServiceType.TOURNAMENT &&
              service.level === ServiceLevel.ADVANCED &&
              service.config.used < service.config.maxTournaments
          ) && !pack.expired
      ),
    [packagesData]
  );

  return (
    <>
      {packages && packages.length > 0 ? (
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
              {packages.map((pack) => (
                <TableRow key={pack.id}>
                  <TableCell align="center">{pack.name}</TableCell>
                  <TableCell align="center">{formatDateTime(pack.startDate)}</TableCell>
                  <TableCell align="center">{formatDateTime(pack.endDate)}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onChooseMyPackage(pack.id)}
                    >
                      Use
                    </Button>
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
            justifyContent: 'center',
            alignItems: 'center',
            height: 500,
          }}
        >
          <NoData
            message={`You haven't owned a package that support creating tournament.`}
            gap={4}
          />
        </Box>
      )}
    </>
  );
}
