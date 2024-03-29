import { Box, Stack } from '@mui/material';
import { useMemo, useState } from 'react';

import CenterLoading from 'components/Common/CenterLoading';
import { useGetMyPackagesQuery, useGetPackagesQuery } from 'store/api/packageApiSlice';
import { ServiceType, UserPackage } from 'types/package';

import ChooseTournamentPackage from './ChooseTournamentService';
import FormCreate from './FormCreate';
import MyTournamentPackages from './MyTournamentPackages';

export default function CreateTournament() {
  const [selectedPackage, setSelectedPackage] = useState<UserPackage | null>(null);

  const { data: packageData, isSuccess: fetchedPackages } = useGetPackagesQuery();
  const { data: myPackageData, isSuccess: fetchedMyPackages } = useGetMyPackagesQuery();

  const myTournamentPackages = useMemo(
    () =>
      myPackageData?.filter((boughtPackage) => {
        return !!boughtPackage.services.find(
          (service) => service.type === ServiceType.TOURNAMENT && service.used < service.maxTournaments
        );
      }),
    [myPackageData]
  );

  const handleChooseMyPackage = (packageId: string) => {
    setSelectedPackage(myTournamentPackages?.find((e) => e.id === packageId) as UserPackage);
  };

  if (!fetchedPackages || !fetchedMyPackages) {
    return <CenterLoading />;
  }

  return (
    <Box>
      {selectedPackage ? (
        <FormCreate
          selectedPackage={selectedPackage}
          setSelectedPackage={setSelectedPackage}
        />
      ) : (
        <Stack spacing={4}>
          <ChooseTournamentPackage
            packages={packageData}
            onChoosePackage={setSelectedPackage}
          />
          {myTournamentPackages && myTournamentPackages.length > 0 && (
            <MyTournamentPackages
              packageData={myTournamentPackages}
              onChooseMyPackage={handleChooseMyPackage}
            />
          )}
        </Stack>
      )}
    </Box>
  );
}
