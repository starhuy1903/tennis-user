export type PaymentInfoPayload = {
  image: string;
  amount: number;
  unit: string;
  payment: {
    method: string;
    bank: {
      name: string;
      account: string;
      owner: string;
    };
  };
  reminderDate: string;
  dueDate: string;
};

export type UserPaymentInfo = {
  userId: string;
  image: string;
  name: string;
  status: 'wait' | 'pending' | 'succeed' | 'failed';
  message: string;
};

export type UpdatedUserPaymentData = {
  userId: string;
  status: 'succeed' | 'failed';
  errorMessage?: string;
};
