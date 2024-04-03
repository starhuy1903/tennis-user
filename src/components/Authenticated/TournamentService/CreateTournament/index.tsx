import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box } from '@mui/material';
import Tab from '@mui/material/Tab';
import { useMemo, useState } from 'react';

import CenterLoading from 'components/Common/CenterLoading';
import { useGetMyPackagesQuery, useGetPackagesQuery } from 'store/api/packageApiSlice';
import { ServiceType, UserPackage } from 'types/package';
import { getValidTournamentPackages } from 'utils/package';

import ChooseTournamentPackage from './ChooseTournamentService';
import FormCreate from './FormCreate';
import MyPackages from './MyPackages';

export default function CreateTournament() {
  const [currentTab, setCurrentTab] = useState('1');

  const [selectedPackage, setSelectedPackage] = useState<UserPackage | null>(null);

  const { data: packageData, isSuccess: fetchedPackages } = useGetPackagesQuery();
  const { data: myPackageData, isSuccess: fetchedMyPackages } = useGetMyPackagesQuery();

  const myTournamentPackages = useMemo(() => getValidTournamentPackages(myPackageData || []), [myPackageData]);

  const handleChooseMyPackage = (packageId: number) => {
    setSelectedPackage(myTournamentPackages?.find((e) => e.id === packageId) as UserPackage);
  };

  const handleChangeTab = (_: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  if (!fetchedPackages || !fetchedMyPackages) {
    return <CenterLoading />;
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1', mt: 2 }}>
      {selectedPackage ? (
        <FormCreate
          selectedPackage={selectedPackage}
          setSelectedPackage={setSelectedPackage}
        />
      ) : (
        <TabContext value={currentTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={handleChangeTab}
              aria-label="lab API tabs example"
              variant="fullWidth"
            >
              <Tab
                label="Buy Packages"
                value="1"
              />
              <Tab
                label="My Packages"
                value="2"
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <ChooseTournamentPackage
              packages={packageData}
              onChoosePackage={setSelectedPackage}
            />
          </TabPanel>
          <TabPanel value="2">
            <MyPackages
              packageData={myTournamentPackages}
              onChooseMyPackage={handleChooseMyPackage}
              type={ServiceType.TOURNAMENT}
            />
          </TabPanel>
        </TabContext>
      )}
    </Box>
  );
}
