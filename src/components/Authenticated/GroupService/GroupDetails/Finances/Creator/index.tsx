import PaidIcon from '@mui/icons-material/Paid';
import SavingsIcon from '@mui/icons-material/Savings';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Box, Stack, Tab } from '@mui/material';
import { useState } from 'react';
import { useAppSelector } from 'store';

import { useGetGeneralFinanceInfoQuery } from 'store/api/group/financeApiSlice';
import { selectGroup } from 'store/slice/groupSlice';

import ExpenseTable from '../Shared/ExpenseTable';
import Statistic from '../Shared/Statistic';

const tabs = [
  {
    label: 'Expenses',
    value: 0,
    icon: <PaidIcon />,
  },
  {
    label: 'Income',
    value: 1,
    icon: <SavingsIcon />,
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    'id': `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FinanceCreator() {
  const groupData = useAppSelector(selectGroup);

  const {
    data: generalFinanceInfo,
    isLoading: fetchingGeneralInfo,
    refetch: fetchGeneralInfo,
  } = useGetGeneralFinanceInfoQuery(groupData.id);
  const [currentTab, setCurrentTab] = useState(0);

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Box>
      <Stack gap={4}>
        <Statistic
          isLoading={fetchingGeneralInfo}
          generalFinanceInfo={generalFinanceInfo}
        />
        <Box>
          <TabContext value={currentTab}>
            <TabList
              onChange={handleChangeTab}
              aria-label="lab API tabs example"
              variant="fullWidth"
              sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 4, p: 1 }}
            >
              {tabs.map((tab) => {
                return (
                  <Tab
                    key={tab.value}
                    label={tab.label}
                    value={tab.value}
                    {...a11yProps(tab.value)}
                    icon={tab.icon}
                    iconPosition="start"
                  />
                );
              })}
            </TabList>
          </TabContext>
        </Box>

        <CustomTabPanel
          value={currentTab}
          index={0}
        >
          <ExpenseTable fetchGeneralInfo={fetchGeneralInfo} />
        </CustomTabPanel>
        <CustomTabPanel
          value={currentTab}
          index={1}
        ></CustomTabPanel>
      </Stack>
    </Box>
  );
}
