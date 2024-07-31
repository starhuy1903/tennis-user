import {
  Box,
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from 'store';

import { useGetFundRequestForMemberQuery, useMemberConfirmFundRequestMutation } from 'store/api/group/financeApiSlice';
import { selectGroup } from 'store/slice/groupSlice';
import { FundRequestForMember, MemberPaymentStatus } from 'types/expense';

import FundInformation from '../Shared/FundInformation';

export default function FinanceMember() {
  const confirm = useConfirm();
  const groupData = useAppSelector(selectGroup);
  const { currentData: fundData, refetch: fetchFundRequestForMember } = useGetFundRequestForMemberQuery({
    groupId: groupData.id,
  });

  const [selectedFund, setSelectedFund] = useState<FundRequestForMember | null>(null);

  const [confirmMakingPaymentRequest, { isLoading: isConfirming }] = useMemberConfirmFundRequestMutation();

  const handleChangeFund = useCallback(
    (e: SelectChangeEvent<number>) => {
      setSelectedFund(fundData?.data.find((item) => item.id === Number(e.target.value)) || null);
    },
    [fundData?.data]
  );

  const handleConfirmPayment = useCallback(() => {
    if (!selectedFund) return;

    confirm({ title: 'Confirm payment', description: 'Are you sure you want to confirm your payment?' }).then(
      async () => {
        try {
          const res = await confirmMakingPaymentRequest({
            groupId: groupData.id,
            fundId: selectedFund.groupFundId,
          }).unwrap();
          await fetchFundRequestForMember();
          setSelectedFund((prev) => ({ ...prev, status: res.status }) as FundRequestForMember);
        } catch (error) {
          // handled error
        }
      }
    );
  }, [confirm, confirmMakingPaymentRequest, fetchFundRequestForMember, groupData.id, selectedFund]);

  useEffect(() => {
    if (!selectedFund) {
      setSelectedFund(fundData?.data[0] || null);
    }
  }, [fundData?.data, selectedFund]);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      gap={2}
    >
      <Stack
        gap={4}
        flex={2}
      >
        <FormControl
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
            maxWidth: 700,
          }}
        >
          <FormLabel htmlFor="fund">Fund</FormLabel>
          <Select
            value={selectedFund?.id || ''}
            id="fund"
            onChange={handleChangeFund}
            size="small"
            fullWidth
          >
            {fundData && fundData.data.length > 0 ? (
              fundData.data.map((fund) => (
                <MenuItem
                  key={fund.id}
                  value={fund.id}
                >
                  {fund.title}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No fund available</MenuItem>
            )}
          </Select>
        </FormControl>
        <FundInformation data={selectedFund} />
      </Stack>
      <Box flex={1}>
        {selectedFund && [MemberPaymentStatus.WAITING, MemberPaymentStatus.REJECTED].includes(selectedFund.status) && (
          <Stack
            gap={1}
            alignItems="flex-start"
          >
            <Typography>
              After you make a successful payment, click this confirmation button to let the admin double check your
              payment!
            </Typography>
            <Button
              variant="contained"
              onClick={handleConfirmPayment}
              disabled={isConfirming}
            >
              Confirm
            </Button>
          </Stack>
        )}
      </Box>
    </Box>
  );
}
