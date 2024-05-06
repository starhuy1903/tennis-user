export enum OrderStatus {
  NEW = 'new',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

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
