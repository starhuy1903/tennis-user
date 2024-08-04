import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box } from '@mui/material';
import Tab from '@mui/material/Tab';
import { useMemo, useState } from 'react';

import { Breadcrumbs } from 'components/Common/Breadcrumb';
import CenterLoading from 'components/Common/CenterLoading';
import PackagePricing from 'components/Common/PackagePricing';
import { PackageType } from 'constants/package';
import { useGetMyPackagesQuery } from 'store/api/packageApiSlice';
import { UserPackage } from 'types/package';
import { getValidAdvertisementPackages } from 'utils/package';

import FormCreateAdvertisement from './FormCreateAdvertisement';
import MyPackages from './MyPackages';

export default function CreateAdvertisement() {
  const [currentTab, setCurrentTab] = useState('1');

  const [selectedPackage, setSelectedPackage] = useState<UserPackage | null>(null);

  const { data: myPackageData, isSuccess: fetchedMyPackages } = useGetMyPackagesQuery();

  const myAdvertisementPackages = useMemo(() => getValidAdvertisementPackages(myPackageData || []), [myPackageData]);

  const handleChooseMyPackage = (packageId: string) => {
    setSelectedPackage(myAdvertisementPackages?.find((e) => e.id === packageId) as UserPackage);
  };

  const handleChangeTab = (_: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  const customRoutes = [
    {
      path: '/affiliates/create',
      breadcrumb: 'Create Advertisement',
    },
  ];

  if (!fetchedMyPackages) {
    return <CenterLoading />;
  }

  return (
    <Box
      sx={{
        paddingBottom: 8,
      }}
    >
      <Breadcrumbs customRoutes={customRoutes} />

      <Box sx={{ width: '100%', typography: 'body1' }}>
        {selectedPackage ? (
          <FormCreateAdvertisement
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
                packagesData={myAdvertisementPackages}
                onChooseMyPackage={handleChooseMyPackage}
              />
            </TabPanel>
            <TabPanel value="2">
              <PackagePricing
                type={PackageType.AFFILIATE}
                title="Our advertisement packages"
              />
            </TabPanel>
          </TabContext>
        )}
      </Box>
    </Box>
  );
}
