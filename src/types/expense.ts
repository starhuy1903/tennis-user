export type Expense = {
  id: number;
  type: 'expense';
  categories: string[];
  amount: number;
  description: string;
  createdAt: string;
};

export type GeneralFinanceInfo = {
  balance: number;
  currentFund: {
    id: string;
    title: string;
    currentAmount: number;
    targetAmount: number;
  } | null;
};

export enum MemberPaymentStatus {
  WAITING = 'waiting',
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export type CreateExpensePayload = {
  type: 'expense';
  categories: string[];
  amount: number;
  description: string;
};

export type GroupFund = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  amount: number;
  paymentInfo: string;
  qrImage?: string;
  createdAt: string;
};

export type FundMember = {
  id: number;
  userId: string;
  description: string;
  status: MemberPaymentStatus;
  name: string;
  image: string;
};

export type CreateFundPayload = Omit<GroupFund, 'id' | 'createdAt'>;

export type FundRequestForMember = {
  id: number;
  groupFundId: number;
  status: MemberPaymentStatus;
  title: string;
  description: string;
  dueDate: string;
  amount: number;
  paymentInfo: string;
  qrImage: string;
  createdAt: string;
};
