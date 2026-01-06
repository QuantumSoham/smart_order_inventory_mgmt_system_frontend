export type OrderStatus =
  | 'CREATED'
  | 'APPROVED'
  | 'PACKED'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export interface Order {
  id: number;
  userId: number;
  warehouseId: number;
  status: OrderStatus;
  totalAmount: number;
  createdAt: string;

  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  city: string;
  state: string;
  pincode: string;
}

