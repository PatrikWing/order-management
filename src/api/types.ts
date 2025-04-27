import { OrderActionType } from "./enums";

export interface OrdersResponse {
  items: Order[];
  error: string;
}

export interface Order {
  id: number;
  instrumentId: Instrument["id"];
  amount: number;
  price: number;
  action: OrderActionType;
  updatedAt: string;
  createdAt: string;
}

export interface InstrumentsResponse {
  items: Instrument[];
  error: string;
}

export interface Instrument {
  id: number;
  ticker: string;
  name: string;
}
