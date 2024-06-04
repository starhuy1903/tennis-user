import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box } from '@mui/material';
import Tab from '@mui/material/Tab';
import { useMemo, useState } from 'react';

import PackagePricing from 'components/Common/ PackagePricing';
import { Breadcrumbs } from 'components/Common/Breadcrumb';
import CenterLoading from 'components/Common/CenterLoading';
import { useGetMyPackagesQuery } from 'store/api/packageApiSlice';
import { PackageType, UserPackage } from 'types/package';
import { getValidTournamentPackages } from 'utils/package';

import FormCreateTournament from './FormCreateTournament';
import MyPackages from './MyPackages';

export default function CreateTournament() {
  const [currentTab, setCurrentTab] = useState('1');

  const [selectedPackage, setSelectedPackage] = useState<UserPackage | null>(null);

  const { data: myPackageData, isSuccess: fetchedMyPackages } = useGetMyPackagesQuery();

  const myTournamentPackages = useMemo(() => getValidTournamentPackages(myPackageData || []), [myPackageData]);

  const handleChooseMyPackage = (packageId: string) => {
    setSelectedPackage(myTournamentPackages?.find((e) => e.id === packageId) as UserPackage);
  };

  const handleChangeTab = (_: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  const customRoutes = [
    {
      path: '/tournaments/create',
      breadcrumb: 'Create tournament',
    },
  ];

  if (!fetchedMyPackages) {
    return <CenterLoading />;
  }

  return (
    <>
      <Breadcrumbs customRoutes={customRoutes} />

      <Box sx={{ width: '100%', typography: 'body1', mt: 2 }}>
        {selectedPackage ? (
          <FormCreateTournament
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
                  label="My Packages"
                  value="1"
                />
                <Tab
                  label="Buy Packages"
                  value="2"
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <MyPackages
                packagesData={myTournamentPackages}
                onChooseMyPackage={handleChooseMyPackage}
              />
            </TabPanel>
            <TabPanel value="2">
              <PackagePricing
                type={PackageType.TOURNAMENT}
                title="Our tournament packages"
              />
            </TabPanel>
          </TabContext>
        )}
      </Box>
    </>
  );
}
