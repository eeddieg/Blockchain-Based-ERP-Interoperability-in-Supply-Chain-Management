export interface Customer {
  email: string;
  id: number;
  inventory?: Inventory;
  name: string;
  orders: Order[];
}

export interface CustomerBc {
  company: string;
  email: string;
  id: number;
  name: string;
}

export interface Inventory {
  customerId: number;
  id: number;
  resources: Resource[];
}

export interface Resource {
  amount: number;
  id?: number;
  inventoryId: number;
  orderId: number;
  title: Product;
}

export interface ResourceBc {
  amount: number;
  id: number;
  title: string;
}

export interface Order {
  id: number;
  createdAt: Date;
  customerId: number;
  deliveredAt: Date;
  list: Resource[];
  status: OrderStatus;
  type: OrderType;
}

export interface OrderBc {
  address: string;
  company: string;
  createdAt: number;
  customerId: number;
  deliveredAt: number;
  orderId: number;
  resourceId: number;
  status: string;
  type: string;
  token: string;
}

export type Receipt = {
  orderId: number;
  to: string;
  from: string;
  blockHash: string;
  blockNumber: number;
  status: number;
  hash: string;
};

export interface Order {
  id: number;
  createdAt: Date;
  customerId: number;
  deliveredAt: Date;
  list: Resource[];
  status: OrderStatus;
  type: OrderType;
  token: TraceabilityTokenObject;
}
export interface TraceabilityTokenObject {
  id?: number;
  orderId: number;
  token: {
    stakeholderToken: string; // Layer# + Company name
    productToken: string; // productToBuy + orderID
    processToken: string; // type of process, if applied
  };
}

export enum OrderStatus {
  PLACED,
  PROCESS,
  COMPLETED,
  CANCELED,
}

export enum OrderType {
  INCOMING,
  OUTCOMING,
}

export enum Product {
  WHEAT_SEED,
  WHEAT,
  WHEAT_SACK,
  WHEAT_SACK_PALLETE_PRE,
  WHEAT_SACK_PALLETE_POST,
  FLOUR,
  BREAD_PRODUCT,
  DISTRIBUTED_BREAD_PRODUCT,
  BREAD_PRODUCT_CONSUMER,
}

export enum ProductBc {
  NULL = "",
  WHEAT_SEED = "WHEAT_SEED",
  WHEAT = "WHEAT",
  WHEAT_SACK = "WHEAT_SACK",
  WHEAT_SACK_PALLETE_PRE = "WHEAT_SACK_PALLETE_PRE",
  WHEAT_SACK_PALLETE_POST = "WHEAT_SACK_PALLETE_POST",
  FLOUR = "FLOUR",
  BREAD_PRODUCT = "BREAD_PRODUCT",
  DISTRIBUTED_BREAD_PRODUCT = "DISTRIBUTED_BREAD_PRODUCT",
  BREAD_PRODUCT_CONSUMER = "BREAD_PRODUCT_CONSUMER",
}

export enum OrderStatusBc {
  PLACED = "PLACED",
  PROCESS = "PROCESS",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

export enum OrderTypeBc {
  INCOMING = "INCOMING",
  OUTCOMING = "OUTCOMING",
}