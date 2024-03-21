import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import CenterLoading from 'components/Common/CenterLoading';
import Status from 'components/Common/Status';
import { useLazyReturnVnpQuery } from 'store/api/payment/paymentApiSlice';
import { VnpPaymentPayload } from 'types/payment';

export default function VNPReturn() {
  const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState('loading');

  const [returnUrl] = useLazyReturnVnpQuery();

  useEffect(() => {
    const paymentInfo: VnpPaymentPayload = {
      vnp_Amount: searchParams.get('vnp_Amount') || '',
      vnp_BankCode: searchParams.get('vnp_BankCode') || '',
      vnp_BankTranNo: searchParams.get('vnp_BankTranNo') || '',
      vnp_CardType: searchParams.get('vnp_CardType') || '',
      vnp_OrderInfo: searchParams.get('vnp_OrderInfo') || '',
      vnp_PayDate: searchParams.get('vnp_PayDate') || '',
      vnp_ResponseCode: searchParams.get('vnp_ResponseCode') || '',
      vnp_TmnCode: searchParams.get('vnp_TmnCode') || '',
      vnp_TransactionNo: searchParams.get('vnp_TransactionNo') || '',
      vnp_TransactionStatus: searchParams.get('vnp_TransactionStatus') || '',
      vnp_TxnRef: searchParams.get('vnp_TxnRef') || '',
      vnp_SecureHash: searchParams.get('vnp_SecureHash') || '',
    };

    (async () => {
      try {
        const res: any = await returnUrl(paymentInfo);

        if (res?.status === 'fulfilled') {
          setPaymentStatus('success');
        } else {
          setPaymentStatus('failed');
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [returnUrl, searchParams]);

  if (paymentStatus === 'loading') {
    return <CenterLoading />;
  }

  return paymentStatus === 'success' ? (
    <Status
      status="success"
      title="Package Payment Successful!"
      description="The payment has been done successully. Thank you for using our service."
    >
      <Button
        component={Link}
        to="/"
        size="large"
        color="primary"
        variant="contained"
        sx={{
          width: 200,
        }}
      >
        Go back
      </Button>
    </Status>
  ) : (
    <Status
      status="failed"
      title="Package Payment Failed!"
      description="Your payment has been failed. Please try again or contact us for support."
    >
      <Button
        component={Link}
        to="/pricing"
        size="large"
        color="primary"
        variant="outlined"
        sx={{
          width: 200,
        }}
      >
        Try again
      </Button>
    </Status>
  );
}
