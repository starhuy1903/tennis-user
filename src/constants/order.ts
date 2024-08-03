export enum OrderStatus {
  NEW = 'new',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export const OrderStatusChip: {
  [key in OrderStatus]: {
    label: string;
    color: 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
  };
} = {
  [OrderStatus.NEW]: {
    label: 'Waiting for payment',
    color: 'info',
  },
  [OrderStatus.COMPLETED]: {
    label: 'Completed',
    color: 'success',
  },
  [OrderStatus.CANCELLED]: {
    label: 'Cancelled',
    color: 'error',
  },
};

export enum OrderType {
  CREATE = 'create',
  RENEW = 'renew',
  UPGRADE = 'upgrade',
}

export const OrderTypeOptions = {
  [OrderType.CREATE]: 'Buy New Package',
  [OrderType.RENEW]: 'Renew Package',
  [OrderType.UPGRADE]: 'Upgrade Package',
};

export const OrderStatusOptions = {
  [OrderStatus.NEW]: 'New',
  [OrderStatus.COMPLETED]: 'Completed',
  [OrderStatus.CANCELLED]: 'Cancelled',
};

export enum PaymentPartner {
  VNPAY = 'VNPAY',
  ZALOPAY = 'ZALOPAY',
}

export const PaymentPartnerOptions = {
  [PaymentPartner.VNPAY]: 'VNPAY',
  [PaymentPartner.ZALOPAY]: 'ZaloPay',
};
