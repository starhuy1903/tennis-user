import { BaseType } from './base';

export enum OrderStatus {
  NEW = 'new',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

export enum PaymentPartner {
  VNPAY = 'VNPAY',
  ZALOPAY = 'ZALOPAY',
}

export type Order = BaseType & {
  id: string;
  userId: number;
  packageId: number;
  groupId?: number;
  price: number;
  status: OrderStatus;
};

export type PaymentResponse = {
  url: string;
};

export type CreateOrderPayload = {
  packageId: number;
  userId: number;
  partner: PaymentPartner;
};

export type CreateOrderResponse = {
  order: Order;
  payment: PaymentResponse;
};
