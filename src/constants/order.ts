export enum OrderStatus {
  NEW = 'new',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

export const OrderStatusOptions = {
  [OrderStatus.NEW]: 'New',
  [OrderStatus.COMPLETED]: 'Completed',
  [OrderStatus.CANCELED]: 'Canceled',
};

export enum PaymentPartner {
  VNPAY = 'VNPAY',
  ZALOPAY = 'ZALOPAY',
}
