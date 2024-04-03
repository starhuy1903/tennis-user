import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';

import { useCreateOrderMutation } from 'store/api/order/orderApiSlice';
import { PaymentPartner } from 'types/order';
import { showError } from 'utils/toast';

import VNPay from 'assets/images/vnpay.jpg';
import ZaloPay from 'assets/images/zalopay.png';

import BaseModal from './BaseModal';
import { SelectPaymentMethodProps } from './types';

const methods = [
  {
    id: 1,
    name: 'VNPAY',
    image: VNPay,
    type: PaymentPartner.VNPAY,
  },
  {
    id: 2,
    name: 'ZaloPay',
    image: ZaloPay,
    type: PaymentPartner.ZALOPAY,
  },
];

export default function SelectPaymentMethod({ userId, packageId, onModalClose }: SelectPaymentMethodProps) {
  const [partner, setPartner] = useState<PaymentPartner>(PaymentPartner.VNPAY);
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handleCreateOrder = async () => {
    if (partner === PaymentPartner.ZALOPAY) {
      showError('ZaloPay is not supported yet');
      return;
    }

    try {
      const res = await createOrder({
        packageId,
        userId,
        partner,
      }).unwrap();

      const paymentUrl = res.payment.url;

      window.open(paymentUrl, '_self');
    } catch (error) {
      console.error(error);
    }
  };

  const renderBody = () => {
    return (
      <Stack
        direction="row"
        justifyContent="center"
        gap={6}
      >
        {methods.map((method) => (
          <Box key={method.id}>
            <Box
              component="img"
              src={method.image}
              alt={method.name}
              width={100}
              height={100}
              border={partner === method.type ? '2px solid #00a4e4' : '1px solid gray'}
              borderRadius={2}
              sx={{
                cursor: 'pointer',
              }}
              onClick={() => setPartner(method.type)}
            />
            <Typography
              variant="body1"
              textAlign="center"
              color={partner === method.type ? '#00a4e4' : 'black'}
              mt={1}
            >
              {method.name}
            </Typography>
          </Box>
        ))}
      </Stack>
    );
  };

  return (
    <BaseModal
      headerText="Select Payment Method"
      onModalClose={onModalClose}
      body={renderBody()}
      primaryButtonText="Continue"
      onClickPrimaryButton={handleCreateOrder}
      disabledPrimaryButton={isLoading}
    />
  );
}
