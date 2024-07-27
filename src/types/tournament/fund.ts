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

export type TeamPaymentInfo = {
  id: string;
  status: UserPaymentStatus;
  message: string;
  team: {
    id: string;
    user1: {
      id: string;
      image: string;
      name: string;
    };
    user2: {
      id: string;
      image: string;
      name: string;
    } | null;
  };
};

export type UpdatedTeamPaymentData = {
  teamId: string;
  status: UserPaymentStatus.SUCCEED | UserPaymentStatus.FAILED;
  errorMessage?: string;
};

export type UserPaymentInfoResponse = {
  status: UserPaymentStatus;
  errorMessage?: string;
};
