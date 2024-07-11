export type PaymentInfoPayload = {
  amount: number;
  unit: string;
  payment: {
    method: string;
    information: string;
    image?: string;
  };
  reminderDate: string;
  dueDate: string;
};

export enum UserPaymentStatus {
  WAIT = 'wait',
  PENDING = 'pending',
  SUCCEED = 'succeed',
  FAILED = 'failed',
}

export type UserPaymentInfo = {
  userId: string;
  image: string;
  name: string;
  status: UserPaymentStatus;
  message: string;
};

export type UpdatedUserPaymentData = {
  userId: string;
  status: UserPaymentStatus.SUCCEED | UserPaymentStatus.FAILED;
  errorMessage?: string;
};

export type UserPaymentInfoResponse = {
  status: UserPaymentStatus;
  errorMessage?: string;
};
